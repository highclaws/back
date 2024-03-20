import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ProductState } from './product-state.enum';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @PrimaryColumn({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  barCode: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ nullable: true })
  state: ProductState;

  @Column({ type: 'date' })
  createdAt: string;

  @Column({ type: 'date', nullable: true })
  updatedAt: string;

  @Column({ type: 'date', nullable: true })
  deleteAt: string;
}
