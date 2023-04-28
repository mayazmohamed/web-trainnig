import { Repository } from 'typeorm';
import { users } from './entity/users.entity';
import { AbstractService } from 'src/common/abstract.service';
export declare class UserService extends AbstractService {
    private readonly userRepository;
    constructor(userRepository: Repository<users>);
    paginate(page?: number, relations?: any[]): Promise<any>;
}
