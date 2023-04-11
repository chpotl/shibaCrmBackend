import {
  IsCreditCard,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { promoType } from '../enums/promocode.enum';

export class CreatePromocodeDto {
  @IsString()
  @MinLength(4)
  code: string;

  @IsEnum(promoType)
  type: string;

  @IsNumber()
  amount: number;
}
