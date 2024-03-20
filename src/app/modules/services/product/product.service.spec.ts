import { ProductService } from './product.service';
import { ProductEntity } from '@/database/entities/product/product';
import { v4 as uuidv4 } from 'uuid';
import { ProductState } from '../../../database/entities/product/product-state.enum';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getInventoryByName', () => {
    it('should return an empty inventory when no products are provided', () => {
      const ProductsNotBrokenDto = productService.getInventoryByName([]);
      expect(ProductsNotBrokenDto.inventory.size).toBe(0);
    });

    it('should return correct inventory when products are provided', () => {
      const products: ProductEntity[] = [
        {
          productId: uuidv4(),
          name: 'Product A',
          barCode: 'ABC123',
          price: 10,
          state: ProductState.OK,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          deleteAt: null,
        },
        {
          productId: uuidv4(),
          name: 'Product B',
          barCode: 'DEF456',
          price: 20,
          state: null,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          deleteAt: null,
        },
        {
          productId: uuidv4(),
          name: 'Product A',
          barCode: 'GHI789',
          price: 15,
          state: ProductState.RECONDITIONNED,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          deleteAt: null,
        },
      ];

      const ProductsNotBrokenDto = productService.getInventoryByName(products);

      // Check inventory size
      expect(ProductsNotBrokenDto.inventory.size).toBe(2);

      // Check product A in inventory
      const productAInventory = ProductsNotBrokenDto.inventory.get('Product A');
      expect(productAInventory).toBeDefined();
      expect(productAInventory.qty).toBe(2);
      expect(productAInventory.totalPrice).toBe(25);
      expect(productAInventory.productBarcodes).toBe('ABC123,GHI789');

      // Check product B in inventory
      const productBInventory = ProductsNotBrokenDto.inventory.get('Product B');
      expect(productBInventory).toBeDefined();
      expect(productBInventory.qty).toBe(1);
      expect(productBInventory.totalPrice).toBe(20);
      expect(productBInventory.productBarcodes).toBe('DEF456');
    });
  });
});
