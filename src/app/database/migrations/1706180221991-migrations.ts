import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProductEntity } from '@/database/entities/product/product';
import { ProductState } from '@/database/entities/product/product-state.enum';
import { v4 as uuidv4 } from 'uuid';

export class Migrations1706180221991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const products: Partial<ProductEntity>[] = [
      {
        productId: uuidv4(),
        name: 'Pen',
        price: 3.52,
        barCode: 'AXD2MDD',
        state: null,
        createdAt: new Date().toISOString(),
      },
      {
        productId: uuidv4(),
        name: 'Pen',
        price: 3.52,
        barCode: 'AXD2MDD',
        state: null,
        createdAt: new Date().toISOString(),
      },
      {
        productId: uuidv4(),
        name: 'Pen',
        price: 3.16,
        barCode: 'AFG2MDD',
        state: null,
        createdAt: new Date().toISOString(),
      },
      {
        productId: uuidv4(),
        name: 'box',
        price: 7.0,
        barCode: 'AXD45DD',
        state: ProductState.BROKEN,
        createdAt: new Date().toISOString(),
      },
      {
        productId: uuidv4(),
        name: 'box',
        price: 4.5,
        barCode: 'AX645DD',
        state: ProductState.RECONDITIONNED,
        createdAt: new Date().toISOString(),
      },
      {
        productId: uuidv4(),
        name: 'Box',
        price: 7.0,
        barCode: 'AXD45XX',
        state: ProductState.OK,
        createdAt: new Date().toISOString(),
      },
      {
        productId: uuidv4(),
        name: 'book',
        price: 12.7,
        barCode: 'AXD478D',
        state: null,
        createdAt: new Date().toISOString(),
      },
      {
        productId: uuidv4(),
        name: 'Game',
        price: 8.9,
        barCode: '542478D',
        state: ProductState.BROKEN,
        createdAt: new Date().toISOString(),
      },
    ];

    await queryRunner.manager.getRepository(ProductEntity).save(products);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(ProductEntity).delete({});
  }
}
