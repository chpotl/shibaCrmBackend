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
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateSubcategoryDto } from './dtos/create-subcategory.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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

  @Get('category')
  getAllCategories() {
    return this.orderService.getAllCategories();
  }

  @Post('category')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.orderService.createCategory(body);
  }

  @Post('subcategory/:id')
  createSubategory(
    @Body() body: CreateSubcategoryDto,
    @Param('id') categoryId: string,
  ) {
    return this.orderService.createSubategory(categoryId, body);
  }
}
