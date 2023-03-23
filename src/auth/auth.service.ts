import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new BadRequestException('user already exist');
    }
    const hash = await bcrypt.hash(password, 2);
    const newUser = await this.userService.createUser(email, hash);
    return this.generateToken({ id: newUser._id, role: newUser.role });
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('incorrect email or password');
    }
    return this.generateToken({ id: user._id, role: user.role });
  }

  private generateToken(payload: any) {
    return {
      refresh_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
    };
  }

  async refreshToken(refresh_token: string) {
    if (!refresh_token) {
      throw new UnauthorizedException('you dont have refresh token');
    }
    const payload = this.jwtService.verify(refresh_token);
    console.log(payload);
    if (!payload) {
      throw new UnauthorizedException('auth error');
    }
    return this.generateToken({ id: payload.id, role: payload.role });
  }
}
