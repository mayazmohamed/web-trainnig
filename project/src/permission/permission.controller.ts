import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {

    constructor(private permissionService: PermissionService){}

    @Get()
    async getPermissions(){
        return this.permissionService.getAll();
    }
}
