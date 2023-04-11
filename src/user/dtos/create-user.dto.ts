import {
  IsCreditCard,
  IsEmail,
  IsMongoId,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
