import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlModule } from './short-url/short-url.module';

@Module({
  imports: [
    ServeStaticModule.forRoot(),
    ConfigModule.forRoot(),
    ShortUrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
