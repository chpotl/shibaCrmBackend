import {
  IsCreditCard,
  IsMongoId,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDeliveryMethodDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
