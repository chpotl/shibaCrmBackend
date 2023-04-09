import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Serialize(AuthDto)
  @Post('signup')
  async createUser(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const { refresh_token, access_token, user } = await this.authService.signup(
      body.email,
      body.password,
    );
    res.cookie('refresh_token', refresh_token);
    return { access_token, user };
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
    res.cookie('refresh_token', refresh_token);
    return { access_token, user };
  }

  @Post('refresh')
  async refreshToken(@Req() req: any, @Res({ passthrough: true }) res: any) {
    // console.log(req.cookies);
    const { refresh_token, access_token } = await this.authService.refreshToken(
      req.cookies?.refresh_token,
    );
    res.cookie('refresh_token', refresh_token);
    return { access_token };
  }
}
