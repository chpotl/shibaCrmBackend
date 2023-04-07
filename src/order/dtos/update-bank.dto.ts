import {
  IsCreditCard,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateBankDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsCreditCard()
  cardNumber: string;
}
