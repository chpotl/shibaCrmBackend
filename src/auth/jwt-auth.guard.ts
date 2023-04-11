import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      if (!request.headers.authorization) {
        return false;
      }
      const [bearer, token] = request.headers.authorization.split(' ');
      if (bearer !== 'Bearer' || !token) {
        return false;
      }
      const user = this.jwtService.verify(token);
      request.user = user;
      // return user.roles.some((role) => requiredRoles.includes(role.value));
      return requiredRoles.includes(user.role);
    } catch (e) {
      return false;
    }
  }
}
