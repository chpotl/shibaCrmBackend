import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, MaxLength } from 'class-validator';

export class CreateSubcategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

  // @IsMongoId()
  // category: string;
}
