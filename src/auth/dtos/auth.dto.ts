import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/user/dtos/user.dto';

export class AuthDto {
  @Expose()
  access_token: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
