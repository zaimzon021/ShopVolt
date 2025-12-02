import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  addToWishlist(@Body('userId') userId: number, @Body('productId') productId: number) {
    return this.wishlistService.addToWishlist(userId, productId);
  }

  @Get(':userId')
  getWishlist(@Param('userId') userId: number) {
    return this.wishlistService.getWishlist(userId);
  }

  @Delete()
  removeFromWishlist(@Body('userId') userId: number, @Body('productId') productId: number) {
    return this.wishlistService.removeFromWishlist(userId, productId);
  }
}
