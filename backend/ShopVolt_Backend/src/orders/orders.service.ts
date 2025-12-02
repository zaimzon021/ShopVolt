import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private paymentService: PaymentService,
  ) {}

  async createOrder(
    userId: number,
    items: { productId: number; quantity: number; price: number }[],
    shippingAddress: string,
    paymentMethod: string,
    paymentId: number,
  ) {
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await this.paymentService.validatePayment(paymentId, userId, totalAmount);

    const orderNumber = `ORD-${Date.now()}`;

    const order = this.orderRepository.create({
      userId,
      orderNumber,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentId,
    });

    await this.orderRepository.save(order);

    const orderItems = items.map((item) =>
      this.orderItemRepository.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }),
    );

    await this.orderItemRepository.save(orderItems);

    await this.paymentService.markPaymentAsUsed(paymentId);

    return { message: 'Order created successfully', orderNumber, orderId: order.id };
  }

  async getAllOrders() {
    return await this.orderRepository.find({
      relations: ['items', 'items.product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOrders(userId: number) {
    return await this.orderRepository.find({
      where: { userId },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items', 'items.product'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateOrderStatus(orderId: number, status: string) {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    order.status = status;
    await this.orderRepository.save(order);
    return { message: 'Order status updated' };
  }
}
