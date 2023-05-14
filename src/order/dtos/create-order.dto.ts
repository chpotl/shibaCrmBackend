import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Currency } from '../schemas/order.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'link to poizon/stockx/farfetch' })
  @IsString()
  url: string;

  @ApiProperty({ description: 'product brand' })
  @IsString()
  brand: string;

  @ApiProperty({ description: 'product size' })
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

  @ApiProperty({
    required: true,
  })
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

  @ApiProperty({ description: 'shiba comission' })
  @IsNumber()
  comission: number; //shiba comission

  // @ApiProperty({ description: 'total price in rubbles' })
  // @IsNumber()
  // totalPrice: number; //total price in rubbles

  @ApiProperty({ description: 'order comment' })
  @IsString()
  @IsOptional()
  comment: string; //order comment

  @ApiProperty({ description: 'show link for client' })
  @IsBoolean()
  @IsOptional()
  showLink: boolean;

  @ApiProperty({ description: 'show product price details' })
  @IsBoolean()
  @IsOptional()
  showDetails: boolean;

  // @Prop({ required: true, default: OrderState.waitingPayment })
  // orderStatus: number; //order status
}
