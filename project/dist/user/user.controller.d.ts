import { UserService } from './user.service';
import { users } from './entity/users.entity';
import { UserCreateDto } from './entity/create-user.dto';
import { UserUpdateDto } from './entity/updateUser.dto';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
export declare class UserController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    all(page?: number): Promise<users[]>;
    create(body: UserCreateDto): Promise<users>;
    getUserById(id: string): Promise<users>;
    updateUserById(id: string, body: UserUpdateDto): Promise<users>;
    updata(request: Request, body: UserUpdateDto): Promise<any>;
    uppassword(request: Request, password: string, password_confirm: string): Promise<any>;
    deleteUserById(id: string): Promise<any>;
}
