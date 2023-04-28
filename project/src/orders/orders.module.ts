import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order.item.entity';
import { Order } from './order.entity';

@Module({

  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Order, OrderItem])
  ],

  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
