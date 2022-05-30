import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { nanoid } from 'nanoid';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { ShortUrl } from './entities/short-url.entity';

interface IShortUrlService {
  create(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrl>;
  findByKey(key: string): Promise<ShortUrl | null>;
  reset();
}

@Injectable()
export class ShortUrlService implements IShortUrlService {
  private readonly logger: Logger = new Logger(ShortUrlService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async create(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrl> {
    this.logger.debug('create');
    let slug = createShortUrlDto.short ?? nanoid(10);
    const shortUrl = new ShortUrl(createShortUrlDto.original, slug);

    while (await this.findByKey(slug)) {
      this.logger.log(`Short Code ${slug} exists already. Create new Slug.`);
      slug = nanoid(10);
    }

    await this.cacheManager.set(shortUrl.short, shortUrl.original, { ttl: 0 });
    this.logger.log('Cached: ' + shortUrl.short);

    return shortUrl;
  }

  public async findByKey(key: string): Promise<ShortUrl | null> {
    const entry = await this.cacheManager.get<string>(key);

    if (!entry) {
      this.logger.debug(`No entry in cache found for: ${key}`);
      return null;
    }

    return new ShortUrl(entry, key);
  }

  public async reset() {
    return this.cacheManager.reset();
  }
}
