import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from './entity/users.entity';
import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class UserService extends AbstractService  {
    constructor(
        @InjectRepository(users)
        private readonly userRepository: Repository<users>
    ) {
        super(userRepository);
    }

    async paginate(page = 1, relations = []): Promise<any>{

        const {data, meta} = await super.paginate(page, relations);
        return {
            data: data.map(user => {
                const {password, ...data} = user;
                return data;
            }),
            meta
        }
    }
}
