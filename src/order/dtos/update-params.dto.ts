import {
  IsCreditCard,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateParamsDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  CNY: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  USD: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  EUR: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  comission: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  marketplaceDelivery: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  internationalDelivery: number;
}
