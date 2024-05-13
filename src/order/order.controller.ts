import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateSubcategoryDto } from './dtos/create-subcategory.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AddOrderInfoDto } from './dtos/add-orderinfo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { excangeRates } from '../utils/exchange-rates';
import { OrderState } from './schemas/order.schema';
import { UpdateOrderComment } from './dtos/update-order-comment.dto';

@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiTags('exchange')
  @Get('exchange')
  getExchangeRates() {
    return excangeRates();
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

  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'orderStatus',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
  })
  @ApiTags('order')
  @Get()
  getAllOrders(
    @Query('page') page: string | undefined,
    @Query('limit') limit: string | undefined,
    @Query('orderStatus') orderStatus: string | undefined,
    @Query('search') search: string | undefined,
  ) {
    return this.orderService.getAllOrdersWithQuery(
      page,
      limit,
      orderStatus,
      search,
    );
  }

  // @Roles('admin', 'manager')
  @ApiTags('order')
  @UseGuards(JwtAuthGuard)
  @Post('')
  createOrder(@Body() body: CreateOrderDto, @Req() req: any) {
    return this.orderService.createOrder(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('order')
  @Put(':id')
  updateOrderStatus(
    @Param('id') orderId: string,
    @Query('status') status: OrderState,
  ) {
    return this.orderService.updateOrderStatus(orderId, +status);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('order')
  @Patch('/comment/:id')
  updateOrderComment(
    @Param('id') orderId: string,
    @Body() body: UpdateOrderComment,
  ) {
    return this.orderService.updateOrderComment(orderId, body.comment);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('order')
  @Patch('/isPaidPartially/:id')
  updateIsPaidPartially(
    @Param('id') orderId: string,
    @Query('status') status: boolean,
  ) {
    return this.orderService.updateIsPaidPartially(orderId, status);
  }

  @ApiTags('order')
  @Patch(':id')
  addOrderInfo(@Body() body: AddOrderInfoDto, @Param('id') orderId: string) {
    return this.orderService.addOrderInfo(orderId, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('order')
  @Delete(':id')
  deleteOrder(@Param('id') orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }

  @ApiTags('order')
  @Get(':id')
  getOrderById(@Param('id') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }
}
