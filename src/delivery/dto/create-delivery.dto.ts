import { ApiProperty } from '@nestjs/swagger';
import {
  IsCreditCard,
  IsMongoId,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
