import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('process')
  processPayment(@Body() body: any) {
    const userId = Number(body.userId);
    const amount = Number(body.amount);
    return this.paymentService.processPayment(
      userId,
      amount,
      body.paymentMethod,
      body.cardNumber,
      body.cardHolder,
    );
  }
}
