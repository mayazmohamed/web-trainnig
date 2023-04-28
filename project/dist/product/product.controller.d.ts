import { ProductService } from './product.service';
import { CreateProductDto } from './models/create.product.dto';
import { UpdateProductDto } from './models/update.product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    all(page?: number): Promise<import("../common/paginated_result.interface").PaginateResult>;
    create(data: CreateProductDto): Promise<any>;
    get(id: string): Promise<any>;
    update(id: string, body: UpdateProductDto): Promise<any>;
    delete(id: string): Promise<string>;
}
