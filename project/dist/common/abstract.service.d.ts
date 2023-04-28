import { Repository } from 'typeorm';
import { PaginateResult } from './paginated_result.interface';
export declare abstract class AbstractService {
    protected readonly repository: Repository<any>;
    protected constructor(repository: Repository<any>);
    getAll(relations?: any[]): Promise<any[]>;
    create(data: any): Promise<any>;
    findOne(data: any, relations?: any[]): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<any>;
    paginate(page?: number, relations?: any[]): Promise<PaginateResult>;
}
