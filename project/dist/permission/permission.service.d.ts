import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { AbstractService } from 'src/common/abstract.service';
export declare class PermissionService extends AbstractService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
}
