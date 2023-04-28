import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Role } from './rolse.entity';
export declare class RolesService extends AbstractService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
}
