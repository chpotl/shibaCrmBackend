import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateParamsDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  CNY: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  USD: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  EUR: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  comission: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  marketplaceDelivery: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  internationalDelivery: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  insurance: number;
}
