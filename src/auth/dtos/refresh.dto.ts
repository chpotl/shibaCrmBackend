import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RefreshDto {
  @ApiProperty()
  @IsString()
  refresh_token: string;
}
