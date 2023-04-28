import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class AuthGuard implements CanActivate {
    private jwtServise;
    constructor(jwtServise: JwtService);
    canActivate(context: ExecutionContext): any;
}
