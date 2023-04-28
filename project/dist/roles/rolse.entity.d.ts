import { Permission } from "src/permission/permission.entity";
export declare class Role {
    id: string;
    name: string;
    permissions: Permission[];
}
