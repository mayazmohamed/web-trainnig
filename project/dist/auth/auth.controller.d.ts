import { UserService } from 'src/user/user.service';
import { RegistritorDto } from './moduls/registritor.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserUpdateDto } from 'src/user/entity/updateUser.dto';
export declare class AuthController {
    private userService;
    private jwtService;
    private authService;
    constructor(userService: UserService, jwtService: JwtService, authService: AuthService);
    register(body: RegistritorDto): Promise<any>;
    login(email: string, password: string, res: Response): Promise<any>;
    user(request: Request): Promise<any>;
    updata(request: Request, body: UserUpdateDto): Promise<any>;
    uppassword(request: Request, password: string, password_confirm: string): Promise<any>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
