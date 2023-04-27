import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class AddOrderInfoDto {
  @ApiProperty()
  @IsString()
  contactName: string;

  @ApiProperty()
  @IsPhoneNumber()
  contactPhone: string;

  @ApiProperty()
  @IsString()
  contactTelegram: string;

  @ApiProperty()
  @IsString()
  deliveryName: string;

  @ApiProperty()
  @IsPhoneNumber()
  deliveryPhone: string;

  @ApiProperty()
  @IsMongoId()
  deliveryType: string;

  @ApiProperty()
  @IsMongoId()
  bank: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  screenShot: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  promocode?: string; //payment method chosen by user
}
