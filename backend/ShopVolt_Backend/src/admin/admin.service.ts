import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../auth/auth.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async adminLogin(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !user.isAdmin) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    return {
      message: 'Admin login successful',
      admin: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async createProduct(productData: any) {
    const product = this.productRepository.create(productData);
    await this.productRepository.save(product);
    return { message: 'Product created successfully', product };
  }

  async updateProduct(id: number, productData: any) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, productData);
    await this.productRepository.save(product);
    return { message: 'Product updated successfully', product };
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.remove(product);
    return { message: 'Product deleted successfully' };
  }

  async getAllProducts() {
    return await this.productRepository.find();
  }

  async createAdmin(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await this.userRepository.save(admin);
    return { message: 'Admin created successfully', adminId: admin.id };
  }
}
