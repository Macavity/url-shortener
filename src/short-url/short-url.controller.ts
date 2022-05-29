import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
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
  @ApiUnprocessableEntityResponse({
    description: 'The provided url is not a valid web url.',
  })
  @ApiBadRequestResponse({
    description:
      'The endpoint requires a valid DTO in the request body. Please refer to the documentation.',
  })
  create(@Body() createShortUrlDto: CreateShortUrlDto) {
    if (!isWebUri(createShortUrlDto.original)) {
      throw new UnprocessableEntityException(null, 'Invalid URL');
    }

    return this.shortUrlService.create(createShortUrlDto);
  }

  @Get('/decode/:slug')
  @ApiNotFoundResponse({ description: 'No matching url was found.' })
  async get(@Param('slug') slug: string) {
    const shortUrl = await this.shortUrlService.findByKey(slug);

    if (!shortUrl) {
      throw new NotFoundException(
        null,
        'There is no registered url found for this short code.',
      );
    }

    return shortUrl;
  }

  @Delete('/reset')
  async reset() {
    return this.shortUrlService.reset();
  }
}
