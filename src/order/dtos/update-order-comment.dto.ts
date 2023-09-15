import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateOrderComment {
  @ApiProperty()
  @IsString()
  comment: string;
}
