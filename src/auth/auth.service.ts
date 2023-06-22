import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('user already exist');
    }
    const newUser = await this.userService.createUser(createUserDto);
    return this.generateToken({ id: newUser._id, role: newUser.role }, newUser);
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('incorrect email or password');
    }
    return this.generateToken({ id: user._id, role: user.role }, user);
  }

  private generateToken(payload: any, user: User) {
    return {
      refresh_token: this.jwtService.sign(payload, { expiresIn: '30d' }),
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      user,
    };
  }

  async refreshToken(refresh_token: string) {
    try {
      if (!refresh_token) {
        throw new UnauthorizedException('you dont have refresh token');
      }
      const payload = await this.jwtService.verify(refresh_token);
      if (!payload) {
        throw new UnauthorizedException('auth error');
      }
      return {
        refresh_token: this.jwtService.sign(
          { id: payload.id, role: payload.role },
          { expiresIn: '1d' },
        ),
        access_token: this.jwtService.sign(
          { id: payload.id, role: payload.role },
          { expiresIn: '15m' },
        ),
      };
    } catch (e) {
      error(e);
      throw new BadRequestException(e.name);
    }
  }
}
