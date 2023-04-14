import { ApiProperty } from '@nestjs/swagger';
import { IsCreditCard, IsMongoId, IsString, MaxLength } from 'class-validator';

export class CreateBankDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsCreditCard()
  cardNumber: string;
}
