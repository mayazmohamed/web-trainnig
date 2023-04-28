import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Role } from './rolse.entity';

@Injectable()
export class RolesService extends AbstractService {

    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) {
        super(roleRepository);
    }
}
