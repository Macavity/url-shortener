import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { isWebUri } from 'valid-url';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { ShortUrlService } from './short-url.service';

@Controller('short-url')
@ApiTags('ShortURL')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post('/encode')
  @ApiUnprocessableEntityResponse()
  @ApiBadRequestResponse()
  create(@Body() createShortUrlDto: CreateShortUrlDto) {
    if (!isWebUri(createShortUrlDto.original)) {
      throw new UnprocessableEntityException(null, 'Invalid URL');
    }

    return this.shortUrlService.create(createShortUrlDto);
  }
}
