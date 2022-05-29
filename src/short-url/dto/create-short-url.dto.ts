import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateShortUrlDto {
  @IsNotEmpty()
  @ApiProperty()
  original: string;
}
