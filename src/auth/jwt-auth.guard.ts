import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      if (!request.headers.authorization) {
        return false;
      }
      const [bearer, token] = request.headers.authorization.split(' ');
      if (bearer !== 'Bearer' || !token) {
        // throw new UnauthorizedException('User is not authorized');
        return false;
      }
      const user = this.jwtService.verify(token);
      request.user = user;
      console.log(user);
      return true;
    } catch (e) {
      return false;
    }
  }
}
