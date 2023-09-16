import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
class ContactInfo {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  telegram: string;
}

class DeliveryInfo {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsMongoId()
  delivery: string;
}

class PaymentMethod {
  @ApiProperty()
  @IsMongoId()
  bank: string;

  @ApiProperty()
  @IsString()
  screenShotUrl: string;
}

export class AddOrderInfoDto {
  @ApiProperty({ type: () => ContactInfo })
  @ValidateNested()
  @Type(() => ContactInfo)
  contactInfo: ContactInfo; //payment method chosen by user

  @ApiProperty({ type: () => DeliveryInfo })
  @ValidateNested()
  @Type(() => DeliveryInfo)
  deliveryInfo: DeliveryInfo;

  @ApiProperty({ type: () => PaymentMethod })
  @ValidateNested()
  @Type(() => PaymentMethod)
  paymentMethod: PaymentMethod; //payment method chosen by user
}
