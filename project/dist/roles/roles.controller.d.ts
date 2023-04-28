import { RolesService } from './roles.service';
import { Role } from './rolse.entity';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    getAll(): Promise<any[]>;
    create(name: string, ids: string[]): Promise<Role>;
    getRoleById(id: string): Promise<Role>;
    updateRoleById(id: string, name: string, ids: string[]): Promise<Role>;
    deleteRoleById(id: string): Promise<any>;
}
