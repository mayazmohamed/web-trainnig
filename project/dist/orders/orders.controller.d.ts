import { OrdersService } from './orders.service';
import { Response } from 'express';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(page?: number): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            total: number;
            created_at: string;
            order_items: import("./order.item.entity").OrderItem[];
        }[];
        meta: {
            total: number;
            page: number;
            lastPage: number;
        };
    }>;
    exportOrders(res: Response): Promise<Response<any, Record<string, any>>>;
    chart(): Promise<any>;
}
