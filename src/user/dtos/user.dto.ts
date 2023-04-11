import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Expose()
  email: string;

  @Expose()
  role: string;
}
