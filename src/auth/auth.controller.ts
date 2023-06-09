import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthDto } from './dtos/auth.dto';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RefreshDto } from './dtos/refresh.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Serialize(AuthDto)
  @Post('signup')
  async createUser(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const { refresh_token, access_token, user } = await this.authService.signup(
      body,
    );
    // res.cookie('refresh_token', refresh_token);
    return { refresh_token, access_token, user };
  }

  @Serialize(AuthDto)
  @Post('signin')
  async loginUser(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const { refresh_token, access_token, user } = await this.authService.signin(
      body.email,
      body.password,
    );
    // res.cookie('refresh_token', refresh_token);
    return { refresh_token, access_token, user };
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshDto) {
    const { refresh_token, access_token } = await this.authService.refreshToken(
      body.refresh_token,
    );
    // res.cookie('refresh_token', refresh_token);
    return { refresh_token, access_token };
  }
}
