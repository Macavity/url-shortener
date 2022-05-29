import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlModule } from './short-url/short-url.module';

@Module({
  imports: [ConfigModule.forRoot(), ShortUrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
