import { PermissionService } from './permission.service';
export declare class PermissionController {
    private permissionService;
    constructor(permissionService: PermissionService);
    getPermissions(): Promise<any[]>;
}
