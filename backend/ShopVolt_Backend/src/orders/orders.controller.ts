import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(
    @Body('userId') userId: number,
    @Body('items') items: { productId: number; quantity: number; price: number }[],
    @Body('shippingAddress') shippingAddress: string,
    @Body('paymentMethod') paymentMethod: string,
    @Body('paymentId') paymentId: number,
  ) {
    return this.ordersService.createOrder(userId, items, shippingAddress, paymentMethod, paymentId);
  }

  // Specific routes must come before parameterized routes
  @Get('all')
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get('user/:userId')
  getOrders(@Param('userId') userId: number) {
    return this.ordersService.getOrders(userId);
  }

  @Get(':orderId')
  getOrderById(@Param('orderId') orderId: number) {
    return this.ordersService.getOrderById(orderId);
  }

  @Put(':orderId/status')
  updateOrderStatus(@Param('orderId') orderId: number, @Body('status') status: string) {
    return this.ordersService.updateOrderStatus(orderId, status);
  }
}
