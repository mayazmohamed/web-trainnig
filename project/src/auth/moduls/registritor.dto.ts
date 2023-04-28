import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty} from 'class-validator';


export class RegistritorDto {
 
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    // @Exclude()
    password_confirm: string;
}