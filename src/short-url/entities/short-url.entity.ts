import { ApiProperty } from '@nestjs/swagger';

export class ShortUrl implements IShortUrl {
  @ApiProperty({
    description: 'The original url',
    example: 'https://www.example.com/page/subpage.html?param=a',
  })
  public original: string;

  @ApiProperty({
    description: 'The generated or provided short code',
    example: 'ab2x-k',
  })
  public short: string;

  constructor(original: string, short: string) {
    this.short = short;
    this.original = original;
  }
}
