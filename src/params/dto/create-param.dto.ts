import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class CreateParamDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  CNY: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  USD: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  EUR: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  comission: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  marketplaceDelivery: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  internationalDelivery: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  insurance: number;
}
