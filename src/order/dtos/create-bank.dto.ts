import { IsCreditCard, IsMongoId, IsString, MaxLength } from 'class-validator';

export class CreateBankDto {
  @IsString()
  name: string;

  @IsCreditCard()
  cardNumber: string;
}
