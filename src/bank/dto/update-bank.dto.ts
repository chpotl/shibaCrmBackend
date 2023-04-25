import { ApiProperty } from '@nestjs/swagger';
import {
  IsCreditCard,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateBankDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsCreditCard()
  cardNumber: string;
}
