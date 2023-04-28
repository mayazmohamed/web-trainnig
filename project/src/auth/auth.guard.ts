import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtServise: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();

    try{
      const jwt = request.headers.authorization.split(' ')[1];
      return this.jwtServise.verify(jwt);
    } catch (e) {
      return false;
    }
  }
}
