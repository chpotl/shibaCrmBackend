import {
  IsCreditCard,
  IsDate,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { promoType } from '../../promocode/enums/promocode.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromocodeDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  code: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  expireDate: Date;

  @ApiProperty()
  @IsEnum(promoType)
  type: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
