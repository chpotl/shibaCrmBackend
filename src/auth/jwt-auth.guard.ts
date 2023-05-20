import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
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
        throw new UnauthorizedException('request auth header is empty');
      }
      const [bearer, token] = request.headers.authorization.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(
          `bearer or toke is empty\n bearer:${bearer} token: ${token}`,
        );
      }
      const user = this.jwtService.verify(token);
      if (!user) {
        throw new UnauthorizedException(`user not found`);
      }
      request.user = user;
      if (!requiredRoles) {
        return true;
      }
      if(!requiredRoles.includes(user.role)){
        throw new ForbiddenException('not enought access')
      }
      return true;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
