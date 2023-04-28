import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import {Order} from './order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './order.item.entity';

@Injectable()
export class OrdersService extends AbstractService {
    
      constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private readonly orderItemsRepository: Repository<OrderItem>,
      ) {
     super(orderRepository);
      }

      async paginate(page: number = 1) {
        const { data, meta } = await super.paginate(page);

        return {
          data: data.map((order: Order) => ({
            id: order.id,
            name: order.name,
            email: order.email,
            total: order.total,
            created_at: order.created_at,
            order_items: order.order_items
          })),
          meta
        }
      }

      async all() {
        return await this.orderItemsRepository.find();
      }


      async  chart() {
        return await this.orderRepository.query(`
          SELECT o.created_at as date, sum(i.quantity * i.product_price) as sum
          FROM orders o
          JOIN order_items i on o.id = i.order_id
          GROUP BY date
        `);
      }
}
