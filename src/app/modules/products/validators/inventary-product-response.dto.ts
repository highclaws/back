import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class InventoryDto {
  @ApiProperty()
  @IsNumber()
  qty: number;

  @ApiProperty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsString()
  productBarcodes: string;
}

export class ProductsNotBrokenDto {
  @ApiProperty({
    type: InventoryDto,
    description: 'Map of products not broken',
  })
  inventory: Map<string, InventoryDto>;
}
