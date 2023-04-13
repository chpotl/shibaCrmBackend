import { Type } from 'class-transformer';
import {
  IsCreditCard,
  IsMongoId,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class ContactInfo {
  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  telegram: string;
}

class DeliveryInfo {
  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsMongoId()
  delivery: string;
}

export class AddOrderInfoDto {
  @ValidateNested()
  @Type(() => ContactInfo)
  contactInfo: ContactInfo; //payment method chosen by user

  @ValidateNested()
  @Type(() => DeliveryInfo)
  deliveryInfo: DeliveryInfo;
}
