import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async addToCart(userId: number, productId: number, quantity: number = 1) {
    const existing = await this.cartRepository.findOne({ where: { userId, productId } });
    
    if (existing) {
      existing.quantity += quantity;
      await this.cartRepository.save(existing);
      return { message: 'Cart updated', quantity: existing.quantity };
    }

    const item = this.cartRepository.create({ userId, productId, quantity });
    await this.cartRepository.save(item);
    return { message: 'Added to cart' };
  }

  async getCart(userId: number) {
    return await this.cartRepository.find({
      where: { userId },
      relations: ['product'],
    });
  }

  async updateQuantity(userId: number, productId: number, quantity: number) {
    const item = await this.cartRepository.findOne({ where: { userId, productId } });
    if (!item) throw new NotFoundException('Item not found in cart');

    item.quantity = quantity;
    await this.cartRepository.save(item);
    return { message: 'Quantity updated' };
  }

  async removeFromCart(userId: number, productId: number) {
    const item = await this.cartRepository.findOne({ where: { userId, productId } });
    if (!item) throw new NotFoundException('Item not found in cart');

    await this.cartRepository.remove(item);
    return { message: 'Removed from cart' };
  }

  async clearCart(userId: number) {
    await this.cartRepository.delete({ userId });
    return { message: 'Cart cleared' };
  }
}
