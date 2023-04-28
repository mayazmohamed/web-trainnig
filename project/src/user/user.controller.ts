import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { users } from './entity/users.entity';
import { UserCreateDto } from './entity/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './entity/updateUser.dto';
import { Request } from 'express';
import { log } from 'console';
import { AuthService } from 'src/auth/auth.service';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {
    }

    @Get()
    async all(@Query('page') page = 1) : Promise<users[]> {
        return await this.userService.paginate(page, ['role']);
    }

    @Post()
    async create(@Body() body : UserCreateDto) : Promise<users> {
        try{
        const password = await bcrypt.hash('1234', 10);

        const {role_id, ...data} = body;
        
        return this.userService.create({
            ...data,
            password,
            role: {id: role_id}
        });
    } catch (e) {
        console.log(e);
    }
    }

    @Get('/:id')
    async getUserById(@Param() id : string) : Promise<users> { 
        return this.userService.findOne(id, ["role"]);
    }

    @Put(':id')
    async updateUserById(@Param() id : string, 
        @Body() body : UserUpdateDto
    ) : Promise<users> {
        await this.userService.update(id, body);
        return this.userService.findOne(id);
    }

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

   @Delete(':id')
    async deleteUserById(@Param() id : string) : Promise<any> {
        return this.userService.delete(id);
    }



}
