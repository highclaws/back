import { ProductEntity } from '@/database/entities/product/product';
import { Inventory } from './interface';
import { ProductsNotBrokenDto } from '../../../modules/products/validators/inventary-product-response.dto';

export class ProductService {
  public getInventoryByName(products: ProductEntity[]): ProductsNotBrokenDto {
    const inventory: Map<string, Inventory> = new Map();
    for (const product of products) {
      const inventoryProduct = inventory.get(product.name);
      if (inventoryProduct) {
        inventoryProduct.qty += 1;
        inventoryProduct.totalPrice += product.price;
        inventoryProduct.productBarcodes += ',' + product.barCode;
        inventory.set(product.name, inventoryProduct);
      } else {
        inventory.set(product.name, {
          qty: 1,
          totalPrice: product.price,
          productBarcodes: product.barCode,
        });
      }
    }
    const productsNotBrokenDto = new ProductsNotBrokenDto();
    productsNotBrokenDto.inventory = inventory;
    return productsNotBrokenDto;
  }
}
