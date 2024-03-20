import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { CreateProductDto } from '../modules/products/validators/create-product.dto';
import { GetProductFilterDto } from '../modules/products/validators/get-product-filter.dto';
import { ProductState } from './entities/product/product-state.enum';
import { ProductEntity } from './entities/product/product';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DateService } from '@/modules/services/date/date.service';

@Injectable()
export class ProductsRepository extends Repository<ProductEntity> {
  constructor(
    private dataSource: DataSource,
    private dateService: DateService,
  ) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  private logger = new Logger('ProductsRepository', { timestamp: true });

  public async getProducts(
    filterDto: GetProductFilterDto,
  ): Promise<ProductEntity[]> {
    const { state, search } = filterDto;

    const query = this.createQueryBuilder('product');

    if (state) {
      query.where('product.state = :state', { state });
    }

    if (search) {
      query.andWhere(
        '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.barCode) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    query.orderBy('product.createdAt', 'DESC');
    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      this.logger.error(
        `Failed to get products. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  public async getProductsNotBroken() {
    const products = await this.find({
      where: [
        {
          state: Not(ProductState.BROKEN),
        },
        {
          state: IsNull(),
        },
      ],
    });
    return products;
  }

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    const { name, price, barCode, state } = createProductDto;
    const product = this.create({
      name,
      price,
      barCode,
      state,
      createdAt: this.dateService.today(),
    });
    await this.save(product);
    return product;
  }

  public updateProduct(product: ProductEntity) {
    this.update(
      { productId: product.productId },
      { ...product, updatedAt: this.dateService.today() },
    );
  }
}
