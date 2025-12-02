import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async processPayment(
    userId: number,
    amount: number,
    paymentMethod: string,
    cardNumber: string,
    cardHolder: string,
  ) {
    const payment = this.paymentRepository.create({
      userId,
      amount,
      paymentMethod,
      cardNumber,
      cardHolder,
      status: 'completed',
    });

    await this.paymentRepository.save(payment);
    return { message: 'Payment processed successfully', paymentId: payment.id };
  }

  async validatePayment(paymentId: number, userId: number, amount: number) {
    const payment = await this.paymentRepository.findOne({ where: { id: paymentId } });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async markPaymentAsUsed(paymentId: number) {
    await this.paymentRepository.update(paymentId, { isUsed: true });
  }
}
