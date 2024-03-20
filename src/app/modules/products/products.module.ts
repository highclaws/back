import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from '@/modules/products/products.controller';
import { ProductsService } from '@/modules/products/products.service';
import { ProductsRepository } from '@/database/products.repository';
import { ProductEntity } from '@/database/entities/product/product';
import { DateService } from '@/modules/services/date/date.service';
import { ProductService } from '@/modules/services/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, DateService, ProductService],
  exports: [],
})
export class ProductsModule {}
