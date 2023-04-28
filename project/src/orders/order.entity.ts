import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order.item.entity";
import { Exclude, Expose } from "class-transformer";
import { log } from "console";

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Exclude()
    firs_name: string;

    @Column()
    @Exclude()
    last_name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: string;

    @OneToMany( () => OrderItem, orderItem => orderItem.order )
    order_items: OrderItem[];



    @Expose()
    get name(): string {
        return `${this.firs_name} ${this.last_name}`;
    }

    @Expose()
    get total() {
        return this.order_items.reduce((sum , i) => sum + i.product_price * i.quantity, 0);
    }

}