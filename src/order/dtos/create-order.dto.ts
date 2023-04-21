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
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'link to poizon/stockx/farfetch' })
  @IsString()
  url: string;

  @ApiProperty({ description: 'product brand' })
  @IsString()
  brand: string;

  @ApiProperty({ description: 'product brand' })
  @IsString()
  @IsOptional()
  size: string;

  @ApiProperty({ description: 'product model' })
  @IsString()
  @IsOptional()
  model: string;

  @ApiProperty({ description: 'product category' })
  @IsMongoId()
  category: string;

  @ApiProperty({ description: 'product subcategory' })
  @IsMongoId()
  subcategory: string;

  @ApiProperty()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ description: 'price for 1 usd/eur/cny' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ description: 'product price in usd/eur/cny' })
  @IsNumber()
  productPrice: number;

  @ApiProperty({ description: 'product price in rubbles' })
  @IsNumber()
  rubblePrice: number;

  @ApiProperty({ description: 'currency' })
  @IsEnum(Currency)
  currency: string;

  @ApiProperty({ description: 'delivery price form poizon/stockx to china' })
  @IsNumber()
  marketplaceDelivery: number;

  @ApiProperty({ description: 'delivery price form china to russia' })
  @IsNumber()
  internationalDelivery: number;

  @ApiProperty({ description: 'insurance' })
  @IsNumber()
  insurance: number;

  @ApiProperty({ description: 'promocode id' })
  @IsMongoId()
  promocode: string;

  @ApiProperty({ description: 'shiba comission' })
  @IsNumber()
  comission: number; //shiba comission

  @ApiProperty({ description: 'total price in rubbles' })
  @IsNumber()
  totalPrice: number; //total price in rubbles

  @ApiProperty({ description: 'order comment' })
  @IsString()
  @IsOptional()
  @MinLength(10)
  comment: string; //order comment

  // @Prop({ required: true, default: OrderState.waitingPayment })
  // orderStatus: number; //order status
}
