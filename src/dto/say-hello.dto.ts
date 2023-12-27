import { ApiProperty } from '@nestjs/swagger';

export class SayHelloDto {
  @ApiProperty({ example: 'hello world ' })
  text: string;
}
