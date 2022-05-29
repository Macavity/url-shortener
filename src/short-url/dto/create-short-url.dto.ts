import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateShortUrlDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'https://www.finn.auto/en-US' })
  original: string;

  @ApiPropertyOptional({
    example: null,
    examples: [null, 'myShortCode'],
  })
  short?: string;
}
