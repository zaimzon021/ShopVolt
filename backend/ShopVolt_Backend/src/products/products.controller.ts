import { Controller, Get, Query, Post, Param } from '@nestjs/common';
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

  @Get('featured')
  async getFeaturedProducts() {
    return this.productsService.getFeaturedProducts();
  }

  @Get('trending')
  async getTrendingProducts() {
    return this.productsService.getTrendingProducts();
  }

  @Get('brands')
  async getBrands() {
    return this.productsService.getAllBrands();
  }

  @Get('search')
  async searchProducts(@Query('q') query: string) {
    return this.productsService.searchProducts(query);
  }

  @Get('price-range')
  async getProductsByPriceRange(
    @Query('min') min: number,
    @Query('max') max: number,
  ) {
    return this.productsService.getProductsByPriceRange(min, max);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @Post('seed')
  async seedProducts() {
    return this.productsService.seedProducts();
  }
}
