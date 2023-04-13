import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Currency } from '../schemas/order.schema';
import { Type } from 'class-transformer';

class PaymentMethod {
  @IsMongoId()
  bank: string;

  @IsString()
  screenShotUrl: string;
}

export class CreateOrderDto {
  @IsString()
  url: string; //link to poizon/stockx/farfetch

  @IsMongoId()
  category: string; //product category

  @IsMongoId()
  subcategory: string; //product subcategory

  @IsString({ each: true })
  images: string[];

  @IsNumber()
  unitPrice: number; //price for 1 usd/eur/cny

  @IsNumber()
  productPrice: number; //product price in usd/eur/cny

  @IsNumber()
  rubblePrice: number; //product price in rubbles

  @IsEnum(Currency)
  currency: number; //product price in rubbles

  @IsNumber()
  marketplaceDelivery: number; //delivery price form poizon/stockx to china

  @IsNumber()
  internationalDelivery: number; //delivery price form china to russia

  @IsNumber()
  comission: number; //shiba comission

  @IsNumber()
  totalPrice: number; //total price in rubbles

  @IsString()
  @IsOptional()
  @MinLength(10)
  comment: string; //order comment

  // @Prop({ required: true, default: OrderState.waitingPayment })
  // orderStatus: number; //order status

  @ValidateNested()
  @Type(() => PaymentMethod)
  paymentMethod: PaymentMethod; //payment method chosen by user
}
