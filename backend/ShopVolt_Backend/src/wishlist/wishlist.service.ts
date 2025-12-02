import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async addToWishlist(userId: number, productId: number) {
    const existing = await this.wishlistRepository.findOne({
      where: { userId, productId },
    });

    if (existing) {
      return { message: 'Already in wishlist' };
    }

    const item = this.wishlistRepository.create({ userId, productId });
    await this.wishlistRepository.save(item);
    return { message: 'Added to wishlist' };
  }

  async getWishlist(userId: number) {
    return await this.wishlistRepository.find({
      where: { userId },
      relations: ['product'],
    });
  }

  async removeFromWishlist(userId: number, productId: number) {
    const item = await this.wishlistRepository.findOne({
      where: { userId, productId },
    });
    if (!item) throw new NotFoundException('Item not found in wishlist');

    await this.wishlistRepository.remove(item);
    return { message: 'Removed from wishlist' };
  }
}
