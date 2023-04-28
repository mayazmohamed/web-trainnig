import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginateResult } from './paginated_result.interface';

@Injectable()
export abstract class AbstractService {
    protected constructor(
        protected readonly repository: Repository<any>
        ) {
    }

    async getAll(relations = []): Promise<any[]> {
        return await this.repository.find({relations});
    }

    async create(data): Promise<any>{
        await this.repository.save(data);
        return await this.repository.findOne({where: data});
    }

    async findOne(data, relations = []): Promise<any> {
        return this.repository.findOne({where:data , relations});

    }
    
    async update(id: string, data): Promise<any> {
        return await this.repository.update(id, data);
    }

    async delete(id: string): Promise<any> {
        return await this.repository.delete(id);
    }

    async paginate(page = 1, relations = []): Promise<PaginateResult>{

        const take = 2;

        const [result, total] = await this.repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations

        });

        return {
            data: result,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / take)
            }
        }
    }
}
