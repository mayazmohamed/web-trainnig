import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    userId(req: Request): Promise<string>;
}
