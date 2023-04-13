import {
  Body,
  Controller,
  Delete,
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
import { CreateDeliveryMethodDto } from './dtos/create-deliveryMethod.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateParamsDto } from './dtos/update-params.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreatePromocodeDto } from './dtos/create-promocode.dto';
import { AddOrderInfoDto } from './dtos/add-orderinfo.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('delivery')
  getAllDeliveryMethods() {
    return this.orderService.getAllDeliveryMethods();
  }

  @Post('delivery')
  createDeliveryMethod(@Body() body: CreateDeliveryMethodDto) {
    return this.orderService.createDeliveryMethod(body);
  }

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

  @Get('params')
  getParams() {
    return this.orderService.getParams();
  }

  @Patch('params')
  async updateParams(@Body() body: UpdateParamsDto) {
    return this.orderService.updateParams(body);
  }

  @Get('promocode/:code')
  async getPromocode(@Param('code') code: string) {
    return this.orderService.getPromocode(code);
  }

  @Delete('promocode/:code')
  async deletePromocode(@Param('code') code: string) {
    return this.orderService.deletePromocode(code);
  }
  @Post('promocode')
  async createPromocode(@Body() body: CreatePromocodeDto) {
    return this.orderService.createPromocode(body);
  }

  @Post(':id')
  createOrder(@Body() body: CreateOrderDto, @Param('id') managerId: string) {
    return this.orderService.createOrder(managerId, body);
  }

  @Patch(':id')
  addOrderInfo(@Body() body: AddOrderInfoDto, @Param('id') orderId: string) {
    return this.orderService.addOrderInfo(orderId, body);
  }
}
