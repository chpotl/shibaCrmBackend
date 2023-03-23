import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async createUser(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const { refresh_token, access_token } = await this.authService.signup(
      body.email,
      body.password,
    );
    res.cookie('refresh_token', refresh_token);
    return { access_token };
  }
  @Post('signin')
  async loginUser(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const { refresh_token, access_token } = await this.authService.signin(
      body.email,
      body.password,
    );
    res.cookie('refresh_token', refresh_token);
    return { access_token };
  }
}
