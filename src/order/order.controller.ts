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
import { OrderService } from './order.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateSubcategoryDto } from './dtos/create-subcategory.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
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
