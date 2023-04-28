import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { Order } from './order.entity';

@Controller()
export class OrdersController {

    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @Get('order')
    async getOrders(
        @Query('page') page: number = 1
    ) {
        return await this.ordersService.paginate(page);
    }

    @Post('export')
    async exportOrders(
        @Res() res: Response
    ) {
        const parser = new Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Quantity', 'Price']
        });

        const orders = await this.ordersService.getAll(['order_items']);

        const json = [];

        orders.forEach((o: Order) => {
            json.push({
                ID: o.id,
                Name: o.name,
                Email: o.email,
                'Product Title': "",
                Quantity: "",
                Price: ""
                
            });
            o.order_items.forEach((i) => {
                json.push({
                    ID: "",
                    Name: "",
                    Email: "",
                    'Product Title': i.product_titel,
                    Quantity: i.quantity,
                    Price: i.product_price
                });
            });
        });

        const csv = parser.parse(json);
        res.header('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        return res.send(csv);
    }

    @Get('chart')
    async chart() {
        return await this.ordersService.chart();
    }
}
