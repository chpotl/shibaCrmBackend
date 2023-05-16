import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles-auth.decorator';
import { error, log, warn } from 'console';

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
      const request = context.switchToHttp().getRequest();
      if (!request.headers.authorization) {
        // warn('request auth header is empty');
        console.log('request auth header is empty');
        return false;
      }
      const [bearer, token] = request.headers.authorization.split(' ');
      if (bearer !== 'Bearer' || !token) {
        // warn(`bearer or toke is empty\n bearer:${bearer} token: ${token}`);
        console.log(
          `bearer or toke is empty\n bearer:${bearer} token: ${token}`,
        );
        return false;
      }
      const user = this.jwtService.verify(token);
      if (!user) {
        // warn(`user not found`);
        console.log(`user not found`);
        return false;
      }
      request.user = user;
      if (!requiredRoles) {
        // log(`required roles are empty`);
        console.log(`required roles are empty`);
        return true;
      }
      return requiredRoles.includes(user.role);
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
