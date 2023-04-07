import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateBankDto } from './dtos/create-bank.dto';
import { OrderService } from './order.service';
import { UpdateBankDto } from './dtos/update-bank.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  getAllOrders() {}

  @Get('bank')
  getAllBanks() {
    return this.orderService.getAllBanks();
  }

  @Post('bank')
  createBank(@Body() body: CreateBankDto) {
    return this.orderService.createBank(body);
  }

  @Patch('bank/:id')
  updateBank(@Body() body: UpdateBankDto, @Param('id') bankId: string) {
    return this.orderService.updateBank(bankId, body);
  }
}
