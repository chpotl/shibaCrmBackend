import { IsMongoId, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsMongoId({ each: true })
  @IsOptional()
  subcategory: string[];
}
