import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(
    @Body('userId') userId: number,
    @Body('productId') productId: number,
    @Body('quantity') quantity?: number,
  ) {
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Get(':userId')
  getCart(@Param('userId') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Put()
  updateQuantity(
    @Body('userId') userId: number,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateQuantity(userId, productId, quantity);
  }

  @Delete()
  removeFromCart(@Body('userId') userId: number, @Body('productId') productId: number) {
    return this.cartService.removeFromCart(userId, productId);
  }

  @Delete(':userId/clear')
  clearCart(@Param('userId') userId: number) {
    return this.cartService.clearCart(userId);
  }
}
