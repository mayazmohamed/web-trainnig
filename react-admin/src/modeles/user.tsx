import { Role } from "../pages/Users/roles";

export class User{
    constructor(
        public id = '',
        public first_name = '',
        public last_name = '',
        public email = '',
        public roles = new Role()
    ){}

    get fullName(){
        return this.first_name + ' ' + this.last_name;
    }
}