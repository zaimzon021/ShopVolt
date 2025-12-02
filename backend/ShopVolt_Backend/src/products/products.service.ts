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

  async getFeaturedProducts() {
    return await this.productRepository.find({ where: { isFeatured: true } });
  }

  async getTrendingProducts() {
    return await this.productRepository.find({ where: { isTrending: true } });
  }

  async getProductById(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async searchProducts(query: string) {
    return await this.productRepository
      .createQueryBuilder('product')
      .where('LOWER(product.name) LIKE LOWER(:query)', {
        query: `%${query}%`,
      })
      .orWhere('LOWER(product.brand) LIKE LOWER(:query)', {
        query: `%${query}%`,
      })
      .orWhere('LOWER(product.category) LIKE LOWER(:query)', {
        query: `%${query}%`,
      })
      .orWhere('LOWER(product.description) LIKE LOWER(:query)', {
        query: `%${query}%`,
      })
      .getMany();
  }

  async getProductsByPriceRange(min: number, max: number) {
    return await this.productRepository
      .createQueryBuilder('product')
      .where('product.price >= :min', { min })
      .andWhere('product.price <= :max', { max })
      .getMany();
  }

  async getAllBrands() {
    const products = await this.productRepository.find();
    const brands = [...new Set(products.map((product) => product.brand))];
    return brands;
  }

  async seedProducts() {
    const count = await this.productRepository.count();
    if (count > 0) {
      return { message: 'Products already seeded' };
    }

    const products = [
      {
        name: 'Wireless Headphones Pro',
        brand: 'TechSound',
        price: 199,
        originalPrice: 249,
        rating: 4.8,
        reviews: 1240,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        category: 'Electronics',
        discount: 20,
        inStock: true,
        isFeatured: true,
        isTrending: true,
        description:
          'Premium wireless headphones with active noise cancellation, 30-hour battery life, and studio-quality sound. Perfect for music lovers and professionals.',
        specs: ['Noise Cancellation', '30hr Battery', 'Bluetooth 5.0'],
      },
      {
        name: 'Smart Watch Ultra',
        brand: 'FitTech',
        price: 299,
        originalPrice: 399,
        rating: 4.7,
        reviews: 890,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        category: 'Electronics',
        discount: 25,
        inStock: true,
        isFeatured: true,
        isTrending: true,
        description:
          'Advanced smartwatch with health monitoring, GPS tracking, and water resistance. Stay connected and track your fitness goals.',
        specs: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
      },
      {
        name: 'Laptop Stand Aluminum',
        brand: 'DeskPro',
        price: 49,
        originalPrice: 79,
        rating: 4.6,
        reviews: 2340,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        category: 'Accessories',
        discount: 38,
        inStock: true,
        isFeatured: true,
        isTrending: false,
        description:
          'Ergonomic aluminum laptop stand with adjustable height and angle. Improve your posture and workspace comfort.',
        specs: ['Adjustable Height', 'Aluminum Build', 'Universal Fit'],
      },
      {
        name: 'Mechanical Keyboard RGB',
        brand: 'KeyMaster',
        price: 129,
        originalPrice: 179,
        rating: 4.9,
        reviews: 1890,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
        category: 'Accessories',
        discount: 28,
        inStock: true,
        isFeatured: true,
        isTrending: true,
        description:
          'Professional mechanical keyboard with RGB backlighting, customizable keys, and tactile switches for the ultimate typing experience.',
        specs: ['RGB Lighting', 'Mechanical Switches', 'Programmable'],
      },
      {
        name: 'USB-C Hub 7-in-1',
        brand: 'ConnectPlus',
        price: 39,
        originalPrice: 59,
        rating: 4.5,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
        category: 'Accessories',
        discount: 34,
        inStock: true,
        isFeatured: false,
        isTrending: true,
        description:
          "Versatile 7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery. Expand your laptop's connectivity.",
        specs: ['7 Ports', '4K HDMI', '100W Power Delivery'],
      },
      {
        name: 'Portable SSD 1TB',
        brand: 'DataFast',
        price: 149,
        originalPrice: 199,
        rating: 4.8,
        reviews: 1123,
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
        category: 'Electronics',
        discount: 25,
        inStock: true,
        isFeatured: false,
        isTrending: true,
        description:
          'Ultra-fast portable SSD with 1TB storage, USB-C connectivity, and shock-resistant design. Perfect for professionals on the go.',
        specs: ['1TB Storage', 'USB-C 3.2', 'Shock Resistant'],
      },
      {
        name: 'Wireless Mouse Pro',
        brand: 'ClickTech',
        price: 59,
        originalPrice: 79,
        rating: 4.6,
        reviews: 890,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        category: 'Accessories',
        discount: 25,
        inStock: true,
        isFeatured: true,
        isTrending: false,
        description:
          'Ergonomic wireless mouse with precision tracking, customizable buttons, and long battery life.',
        specs: ['Wireless', 'Ergonomic', '6 Buttons'],
      },
      {
        name: '4K Webcam',
        brand: 'StreamVision',
        price: 119,
        originalPrice: 159,
        rating: 4.7,
        reviews: 654,
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
        category: 'Electronics',
        discount: 25,
        inStock: true,
        isFeatured: false,
        isTrending: true,
        description:
          'Professional 4K webcam with auto-focus, built-in microphone, and low-light correction. Perfect for streaming and video calls.',
        specs: ['4K Resolution', 'Auto Focus', 'Built-in Mic'],
      },
      {
        name: 'Bluetooth Speaker',
        brand: 'SoundWave',
        price: 79,
        originalPrice: 99,
        rating: 4.5,
        reviews: 1456,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
        category: 'Electronics',
        discount: 20,
        inStock: true,
        isFeatured: true,
        isTrending: false,
        description:
          'Portable Bluetooth speaker with 360° sound, waterproof design, and 20-hour battery life.',
        specs: ['Waterproof', '20hr Battery', '360° Sound'],
      },
      {
        name: 'Gaming Mouse Pad XXL',
        brand: 'GamePro',
        price: 29,
        originalPrice: 39,
        rating: 4.8,
        reviews: 2100,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        category: 'Accessories',
        discount: 26,
        inStock: true,
        isFeatured: false,
        isTrending: true,
        description:
          'Extra-large gaming mouse pad with smooth surface, anti-slip base, and RGB lighting.',
        specs: ['XXL Size', 'RGB Lighting', 'Anti-Slip'],
      },
      {
        name: 'Wireless Charger Stand',
        brand: 'ChargeFast',
        price: 35,
        originalPrice: 49,
        rating: 4.4,
        reviews: 789,
        image: 'https://images.unsplash.com/photo-1591290619762-c588f7e8e86f?w=400',
        category: 'Accessories',
        discount: 29,
        inStock: true,
        isFeatured: false,
        isTrending: false,
        description:
          'Fast wireless charging stand compatible with all Qi-enabled devices. Charge your phone in portrait or landscape mode.',
        specs: ['15W Fast Charge', 'Qi Compatible', 'Adjustable Angle'],
      },
      {
        name: 'Laptop Backpack Pro',
        brand: 'TravelTech',
        price: 69,
        originalPrice: 89,
        rating: 4.7,
        reviews: 1234,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        category: 'Accessories',
        discount: 22,
        inStock: true,
        isFeatured: true,
        isTrending: false,
        description:
          'Professional laptop backpack with USB charging port, water-resistant material, and multiple compartments.',
        specs: ['USB Port', 'Water Resistant', '17-inch Laptop'],
      },
    ];

    await this.productRepository.save(products);
    return { message: 'Products seeded successfully', count: products.length };
  }
}
