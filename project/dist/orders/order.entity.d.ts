import { OrderItem } from "./order.item.entity";
export declare class Order {
    id: string;
    firs_name: string;
    last_name: string;
    email: string;
    created_at: string;
    order_items: OrderItem[];
    get name(): string;
    get total(): number;
}
