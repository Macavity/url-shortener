import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { nanoid } from 'nanoid';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { ShortUrl } from './schemas/short-url.schema';

@Injectable()
export class ShortUrlService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async create(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrl> {
    const slug = nanoid(10);
    const shortUrl = new ShortUrl(createShortUrlDto.original, slug);

    await this.cacheManager.set(shortUrl.short, shortUrl.original, { ttl: 0 });

    return shortUrl;
  }
}
