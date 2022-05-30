import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private readonly logger: Logger = new Logger(ShortUrlController.name);

  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post('/encode')
  @ApiUnprocessableEntityResponse({
    description: 'The provided url is not a valid web url.',
  })
  @ApiBadRequestResponse({
    description:
      'The endpoint requires a valid DTO in the request body. Please refer to the documentation.',
  })
  @ApiBadRequestResponse({
    description: 'Short code exists already.',
  })
  async create(@Body() createShortUrlDto: CreateShortUrlDto) {
    if (!isWebUri(createShortUrlDto.original)) {
      this.logger.error('Error Unprocessable Entity');
      throw new UnprocessableEntityException(null, 'Invalid URL');
    }

    if (
      createShortUrlDto.short &&
      (await this.shortUrlService.findByKey(createShortUrlDto.short))
    ) {
      this.logger.warn(
        'Not modified: The requested short code exists already.',
      );

      throw new BadRequestException(
        null,
        'The requested short code exists already.',
      );
    }

    const result = await this.shortUrlService.create(createShortUrlDto);
    this.logger.log('=> [200] Created: ' + result.short);

    return result;
  }

  @Get('/decode/:slug')
  @ApiNotFoundResponse({ description: 'No matching url was found.' })
  async get(@Param('slug') slug: string) {
    const shortUrl = await this.shortUrlService.findByKey(slug);

    if (!shortUrl) {
      this.logger.error('[400] Not found ' + slug);
      throw new NotFoundException(
        null,
        'There is no registered url found for this short code.',
      );
    }

    return shortUrl;
  }

  @Delete('/reset')
  async reset() {
    this.logger.warn('=== Data Reset === ');
    return this.shortUrlService.reset();
  }
}
