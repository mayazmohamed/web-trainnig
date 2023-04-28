import { Order } from "./order.entity";
export declare class OrderItem {
    id: string;
    product_titel: string;
    product_price: number;
    quantity: number;
    order: Order;
}
