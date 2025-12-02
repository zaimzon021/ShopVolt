import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAllProducts() {
    return await this.productRepository.find();
  }

  async getProductsByCategory(category: string) {
    return await this.productRepository.find({ where: { category } });
  }

  async getCategories() {
    const products = await this.productRepository.find();
    const categoryMap = new Map<string, number>();

    products.forEach((product) => {
      const count = categoryMap.get(product.category) || 0;
      categoryMap.set(product.category, count + 1);
    });

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }

  async seedProducts() {
    const count = await this.productRepository.count();
    if (count > 0) {
      return { message: 'Products already seeded' };
    }

    const products = [
      {
        name: 'Caramel Brownie',
        category: 'Brownies',
        price: 23.0,
        originalPrice: 25.0,
        image: '/shop1.png',
        description:
          'Rich, fudgy brownies swirled with luscious caramel, creating the perfect balance of sweet and decadent in every bite.',
        onSale: true,
      },
      {
        name: 'Chicken Puff',
        category: 'Savories',
        price: 24.0,
        originalPrice: 26.0,
        image: '/shop2.png',
        description:
          'Flaky, golden pastry filled with savory chicken and aromatic spices.',
        onSale: true,
      },
      {
        name: 'Chocolate Chip Cookies',
        category: 'Cookies',
        price: 23.0,
        originalPrice: 25.0,
        image: '/shop3.png',
        description:
          'Classic cookies loaded with chocolate chips, baked to perfection.',
        onSale: true,
      },
      {
        name: 'Glazed Donut',
        category: 'Donuts',
        price: 18.0,
        originalPrice: 20.0,
        image: '/shop4.png',
        description:
          'Soft and fluffy donuts with a sweet glaze that melts in your mouth.',
        onSale: true,
      },
      {
        name: 'Croissant',
        category: 'Pastries',
        price: 22.0,
        originalPrice: 24.0,
        image: '/shop5.png',
        description: 'Buttery, flaky croissants baked fresh daily.',
        onSale: true,
      },
      {
        name: 'Sourdough Bread',
        category: 'Bread',
        price: 15.0,
        originalPrice: 18.0,
        image: '/shop6.png',
        description:
          'Artisan sourdough bread with a crispy crust and soft interior.',
        onSale: true,
      },
      {
        name: 'Red Velvet Cake',
        category: 'Desserts',
        price: 35.0,
        originalPrice: 40.0,
        image: '/red.png',
        description: 'Moist red velvet cake with cream cheese frosting.',
        onSale: true,
      },
      {
        name: 'Blueberry Muffin',
        category: 'Pastries',
        price: 12.0,
        originalPrice: 15.0,
        image: '/shop7.png',
        description: 'Fresh blueberry muffins with a golden top.',
        onSale: true,
      },
      {
        name: 'Cheese Danish',
        category: 'Pastries',
        price: 20.0,
        originalPrice: 22.0,
        image: '/shop8.png',
        description: 'Flaky pastry filled with sweet cream cheese.',
        onSale: true,
      },
    ];

    await this.productRepository.save(products);
    return { message: 'Products seeded successfully', count: products.length };
  }
}
