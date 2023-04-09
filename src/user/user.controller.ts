import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: any) {
    return this.userService.findById(req.user.id);
  }
}
