import { ProductState } from '@/database/entities/product/product-state.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsString()
  barCode: string;

  @IsOptional()
  @IsEnum(ProductState)
  state: ProductState | null;
}
