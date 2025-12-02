import { Controller, Get, Query, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(@Query('category') category?: string) {
    if (category) {
      return this.productsService.getProductsByCategory(category);
    }
    return this.productsService.getAllProducts();
  }

  @Get('categories')
  async getCategories() {
    return this.productsService.getCategories();
  }

  @Post('seed')
  async seedProducts() {
    return this.productsService.seedProducts();
  }
}
