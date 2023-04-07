import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBankDto } from './dtos/create-bank.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  getAllOrders() {}

  @Post()
  createBank(@Body() body: CreateBankDto) {
    return this.orderService.createBank(body);
  }
}
