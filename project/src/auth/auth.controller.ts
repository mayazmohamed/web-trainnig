import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Put, Req, Res, UseGuards, UseInterceptors} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegistritorDto } from './moduls/registritor.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserUpdateDto } from 'src/user/entity/updateUser.dto';
import { log } from 'console';



@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() body: RegistritorDto) {
        if (body.password !== body.password_confirm) {
            throw new Error('Password and password confirmation are not equal');
        }

        const hash = await bcrypt.hash(body.password, 12);
        body.password = hash;
        delete body.password_confirm;
        return await this.userService.create(body);
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) res: Response
    ) {
        
        const user = await this.userService.findOne({email});

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Password is not valid');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});
        

        res.cookie('jwt', jwt, {httpOnly: true})


        return {
            ...user,
            token: jwt
        };
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request){
        try {
            
            const id = await this.authService.userId(request);

            return await this.userService.findOne({id});
        }
        catch (e) {
            return null;
        }

    }

    @UseGuards(AuthGuard)
    @Put('updata')
    async updata(
        @Req() request: Request,
        @Body() body : UserUpdateDto,
        ){
        try {
            
            const id = await this.authService.userId(request);
            await this.userService.update(id, body);
            return await this.userService.findOne({id});
        }
        catch (e) {
            return null;
        }

    }

    @UseGuards(AuthGuard)
    @Put('uppassword')
    async uppassword(
        @Req() request: Request,
        @Body('password') password : string,
        @Body('password_confirm') password_confirm : string
        ){
        try {

            if (password !== password_confirm) {
                throw new BadRequestException('Password and password confirmation are not equal');
            }
            
            const id = await this.authService.userId(request);
            await this.userService.update(id, {
                password: await bcrypt.hash(password, 12)
            });
            return await this.userService.findOne({id});
        }
        catch (e) {
            return null;
        }

    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response) {
        res.clearCookie('jwt');
        return {message: 'Success'};
    }
}
