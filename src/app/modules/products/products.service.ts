import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '@/modules/products/validators/create-product.dto';
import { GetProductFilterDto } from '@/modules/products/validators/get-product-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@/database/entities/product/product';
import { ProductsRepository } from '@/database/products.repository';
import { UpdateProductDto } from './validators/update-product-status.dto';
import { ProductResponseDto } from './validators/product-response.dto';
import { ProductService } from '../services/product/product.service';
import { ProductsNotBrokenDto } from './validators/inventary-product-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private ProductsRepository: ProductsRepository,
    private productService: ProductService,
  ) {}

  async getProducts(
    filterDto: GetProductFilterDto,
  ): Promise<ProductResponseDto[]> {
    const products = await this.ProductsRepository.getProducts(filterDto);
    return products.map((product) => this.getProductResponseDto(product));
  }

  async getProductsNotBroken(): Promise<ProductsNotBrokenDto> {
    const products = await this.ProductsRepository.getProductsNotBroken();
    return this.productService.getInventoryByName(products);
  }

  async getProductById(id: string): Promise<ProductResponseDto> {
    const product = await this.ProductsRepository.findOneBy({
      productId: id,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return this.getProductResponseDto(product);
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product =
      await this.ProductsRepository.createProduct(createProductDto);
    return this.getProductResponseDto(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.ProductsRepository.delete({
      productId: id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.ProductsRepository.findOne({
      where: { productId: id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    product.name = updateProductDto.name;
    product.price = updateProductDto.price;
    product.barCode = updateProductDto.barCode;
    product.state = updateProductDto.state;
    await this.ProductsRepository.updateProduct(product);

    return this.getProductResponseDto(product);
  }

  public getProductResponseDto(product: ProductEntity): ProductResponseDto {
    return { ...product };
  }
}
