import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateShortUrlDto {
  @IsNotEmpty({ message: 'The original url may not be empty.' })
  @ApiProperty({ example: 'https://www.finn.auto/en-US' })
  original: string;

  @ApiPropertyOptional({
    example: null,
    examples: [null, 'myShortCode'],
  })
  short?: string;
}
