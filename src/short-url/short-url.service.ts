import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { nanoid } from 'nanoid';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { ShortUrl } from './entities/short-url.entity';

@Injectable()
export class ShortUrlService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async create(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrl> {
    const slug = createShortUrlDto.short ?? nanoid(10);
    const shortUrl = new ShortUrl(createShortUrlDto.original, slug);

    await this.cacheManager.set(shortUrl.short, shortUrl.original, { ttl: 0 });

    return shortUrl;
  }

  public async findByKey(key: string): Promise<ShortUrl | null> {
    const entry = await this.cacheManager.get<string>(key);

    if (!entry) {
      return null;
    }

    return new ShortUrl(entry, key);
  }

  public async reset() {
    return this.cacheManager.reset();
  }
}
