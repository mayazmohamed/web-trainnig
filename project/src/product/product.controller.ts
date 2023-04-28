import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto } from './models/create.product.dto';
import { UpdateProductDto } from './models/update.product.dto';


@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) 
    {}

    @Get()
    async all(@Query('page') page: number = 1) {
        return await this.productService.paginate(page);
    }

    @Post()
    async create(@Body() data: CreateProductDto) {
        return await this.productService.create(data);
    }

    @Get(':id')
    async get(@Query('id') id: string) {
        return await this.productService.findOne({id});
    }

    @Put(':id')
    async update(@Param('id') id: string,
        @Body() body: UpdateProductDto
    ) {
        await this.productService.update(id, body);
        return this.productService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.productService.delete(id);
        return "Product deleted"
    }
}
