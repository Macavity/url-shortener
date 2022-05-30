import { CacheModule, Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlService } from './short-url.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0, // 0 disables the TTL entirely
    }),
  ],
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
})
export class ShortUrlModule {}
