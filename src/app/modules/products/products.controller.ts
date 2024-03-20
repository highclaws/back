import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from '@/modules/products/validators/create-product.dto';
import { GetProductFilterDto } from '@/modules/products/validators/get-product-filter.dto';
import { UpdateProductDto } from '@/modules/products/validators/update-product-status.dto';
import { Logger } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsNotBrokenDto } from './validators/inventary-product-response.dto';
import { ProductResponseDto } from './validators/product-response.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  private logger = new Logger('ProductsController');

  constructor(private ProductsService: ProductsService) {}

  @Get()
  @ApiOperation({
    description:
      'Retourne la liste des produits ou celles correpondant au filtre donné.',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'La liste des produits actuellement enregistrées.',
    type: ProductResponseDto,
  })
  @ApiInternalServerErrorResponse()
  getProducts(
    @Query() filterDto: GetProductFilterDto,
  ): Promise<ProductResponseDto[]> {
    this.logger.verbose(
      `User retrieving all products. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.ProductsService.getProducts(filterDto);
  }

  @Get('/inventory/')
  @ApiOperation({
    description: 'Retourne la liste des produits classifier par inventaire.',
  })
  @ApiOkResponse({
    isArray: true,
    description:
      'La liste des produits classifier par inventaire actuellement enregistrées.',
    type: ProductsNotBrokenDto,
  })
  @ApiInternalServerErrorResponse()
  getProductsNotBroken(): Promise<ProductsNotBrokenDto> {
    this.logger.verbose(`User retrieving products by inventory.`);
    return this.ProductsService.getProductsNotBroken();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'get produit',
    description: 'Récupérer le produit en base',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: "url explicite permettant d'aller dans le produit associée",
  })
  @ApiResponse({
    status: 200,
    description: "Le produit associée à l'identifiant donné",
    type: ProductResponseDto,
  })
  @ApiInternalServerErrorResponse()
  getProductById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ProductResponseDto> {
    this.logger.verbose(
      `User retrieving an product. Data: ${JSON.stringify(id)}`,
    );

    return this.ProductsService.getProductById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create produit',
    description: 'Créé un nouveau produit en base',
  })
  @ApiResponse({
    status: 200,
    description: "Produit telle qu'il existait en base",
    type: ProductResponseDto,
  })
  @ApiInternalServerErrorResponse()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    this.logger.verbose(
      `creating a new product. Data: ${JSON.stringify(createProductDto)}`,
    );
    return this.ProductsService.createProduct(createProductDto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete Produit',
    description: 'Supprime le produit en base',
  })
  @ApiParam({
    name: 'id',
    description: "L'identifiant de produit à supprimer en base",
  })
  @ApiNotFoundResponse({
    description: 'Produit non trouvée',
  })
  deleteProduct(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    this.logger.verbose(`deleting an product. Data: ${JSON.stringify(id)}`);
    return this.ProductsService.deleteProduct(id);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update Produit',
    description: 'Met à jour le produit en base',
  })
  @ApiParam({
    name: 'id',
    description: "L'identifiant de produit à modifier en base",
  })
  @ApiNotFoundResponse({ description: 'Produit non trouvée' })
  @ApiOkResponse({
    description: 'Produit une fois modifiée',
    type: ProductResponseDto,
  })
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse({ description: 'Produit non trouvée' })
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    this.logger.verbose(`updating an product. Data: ${JSON.stringify(id)}`);
    return this.ProductsService.updateProduct(id, updateProductDto);
  }
}
