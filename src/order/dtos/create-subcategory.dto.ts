import { IsMongoId, IsString, MaxLength } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  name: string;
}
