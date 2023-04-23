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
  UseGuards,
} from '@nestjs/common';
import { CreateBankDto } from './dtos/create-bank.dto';
import { OrderService } from './order.service';
import { UpdateBankDto } from './dtos/update-bank.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateSubcategoryDto } from './dtos/create-subcategory.dto';
import { CreateDeliveryMethodDto } from './dtos/create-deliveryMethod.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateParamsDto } from './dtos/update-params.dto';
import { CreatePromocodeDto } from './dtos/create-promocode.dto';
import { AddOrderInfoDto } from './dtos/add-orderinfo.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @ApiTags('order')
  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @ApiTags('delivery')
  @Get('delivery')
  getAllDeliveryMethods() {
    return this.orderService.getAllDeliveryMethods();
  }

  @ApiTags('delivery')
  @UseGuards(JwtAuthGuard)
  @Post('delivery')
  createDeliveryMethod(@Body() body: CreateDeliveryMethodDto) {
    return this.orderService.createDeliveryMethod(body);
  }

  @ApiTags('bank')
  @Get('bank')
  getAllBanks() {
    return this.orderService.getAllBanks();
  }

  @ApiTags('bank')
  @UseGuards(JwtAuthGuard)
  @Post('bank')
  createBank(@Body() body: CreateBankDto) {
    return this.orderService.createBank(body);
  }

  @ApiTags('bank')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Patch('bank/:id')
  updateBank(@Body() body: UpdateBankDto, @Param('id') bankId: string) {
    return this.orderService.updateBank(bankId, body);
  }

  @ApiTags('category')
  @Get('category')
  getAllCategories() {
    return this.orderService.getAllCategories();
  }

  @ApiTags('category')
  @UseGuards(JwtAuthGuard)
  @Post('category')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.orderService.createCategory(body);
  }

  @ApiTags('category')
  @UseGuards(JwtAuthGuard)
  @Post('subcategory/:id')
  createSubategory(
    @Body() body: CreateSubcategoryDto,
    @Param('id') categoryId: string,
  ) {
    return this.orderService.createSubategory(categoryId, body);
  }

  @ApiTags('prams')
  @Get('params')
  getParams() {
    return this.orderService.getParams();
  }

  @ApiTags('prams')
  @UseGuards(JwtAuthGuard)
  @Patch('params')
  async updateParams(@Body() body: UpdateParamsDto) {
    return this.orderService.updateParams(body);
  }

  @ApiTags('promocode')
  @Get('promocode/')
  async getAppPromocodes() {
    return this.orderService.getAppPromocodes();
  }

  @ApiTags('promocode')
  @Get('promocode/:code')
  async getPromocode(@Param('code') code: string) {
    return this.orderService.getPromocode(code);
  }

  @ApiTags('promocode')
  @UseGuards(JwtAuthGuard)
  @Delete('promocode/:code')
  async deletePromocode(@Param('code') code: string) {
    return this.orderService.deletePromocode(code);
  }

  @ApiTags('promocode')
  @UseGuards(JwtAuthGuard)
  @Post('promocode')
  async createPromocode(@Body() body: CreatePromocodeDto) {
    return this.orderService.createPromocode(body);
  }

  // @Roles('admin', 'manager')
  @ApiTags('order')
  @UseGuards(JwtAuthGuard)
  @Post('')
  createOrder(@Body() body: CreateOrderDto, @Req() req: any) {
    console.log(req.user);
    return this.orderService.createOrder(req.user.id, body);
  }
  @ApiTags('order')
  @Patch(':id')
  addOrderInfo(@Body() body: AddOrderInfoDto, @Param('id') orderId: string) {
    return this.orderService.addOrderInfo(orderId, body);
  }
  @ApiTags('order')
  @Get(':id')
  getOrderById(@Param('id') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }
  @ApiTags('exchange')
  @Get('exchange')
  getExchangeRates() {
    return this.orderService.excangeRates();
  }
}
