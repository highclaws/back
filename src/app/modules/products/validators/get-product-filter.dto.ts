import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProductState } from '@/database/entities/product/product-state.enum';

export class GetProductFilterDto {
  @IsEnum(ProductState)
  @IsOptional()
  state: ProductState;

  @IsOptional()
  @IsString()
  search?: string;
}
