import { AbstractService } from 'src/common/abstract.service';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './order.item.entity';
export declare class OrdersService extends AbstractService {
    private readonly orderRepository;
    private readonly orderItemsRepository;
    constructor(orderRepository: Repository<Order>, orderItemsRepository: Repository<OrderItem>);
    paginate(page?: number): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            total: number;
            created_at: string;
            order_items: OrderItem[];
        }[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    all(): Promise<OrderItem[]>;
    chart(): Promise<any>;
}
