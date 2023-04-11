import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Roles } from 'src/auth/roles-auth.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    return this.userService.findById(req.user.id);
  }

  @Serialize(UserDto)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createManger(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Serialize(UserDto)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteManger(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Serialize(UserDto)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllUsers() {
    return this.userService.findAll();
  }
}
