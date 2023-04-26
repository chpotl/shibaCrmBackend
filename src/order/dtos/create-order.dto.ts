import {
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
    type: 'string',
    isArray: true,
    format: 'binary',
    required: true,
  })
  files: string[];

  @ApiProperty({ description: 'price for 1 usd/eur/cny' })
  @IsNumberString()
  unitPrice: number;

  @ApiProperty({ description: 'product price in usd/eur/cny' })
  @IsNumberString()
  productPrice: number;

  @ApiProperty({ description: 'product price in rubbles' })
  @IsNumberString()
  rubblePrice: number;

  @ApiProperty({ description: 'currency' })
  @IsEnum(Currency)
  currency: string;

  @ApiProperty({ description: 'delivery price form poizon/stockx to china' })
  @IsNumberString()
  marketplaceDelivery: number;

  @ApiProperty({ description: 'delivery price form china to russia' })
  @IsNumberString()
  internationalDelivery: number;

  @ApiProperty({ description: 'insurance' })
  @IsNumberString()
  insurance: number;

  @ApiProperty({ description: 'shiba comission' })
  @IsNumberString()
  comission: number; //shiba comission

  @ApiProperty({ description: 'total price in rubbles' })
  @IsNumberString()
  totalPrice: number; //total price in rubbles

  @ApiProperty({ description: 'order comment' })
  @IsString()
  @IsOptional()
  @MinLength(10)
  comment: string; //order comment

  // @Prop({ required: true, default: OrderState.waitingPayment })
  // orderStatus: number; //order status
}
