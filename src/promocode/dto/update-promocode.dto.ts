import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePromocodeDto } from './create-promocode.dto';
import { IsEnum, IsNumber, IsString, MinLength } from 'class-validator';
import { promoType } from '../enums/promocode.enum';

export class UpdatePromocodeDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  code: string;

  @ApiProperty()
  @IsEnum(promoType)
  type: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
