import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateSubcategoryDto } from './dtos/create-subcategory.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AddOrderInfoDto } from './dtos/add-orderinfo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileMimetypeFilter } from '../utils/file-mimetype-filter';
import { excangeRates } from '../utils/exchange-rates';
import { OrderState } from './schemas/order.schema';

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

  @ApiQuery({
    name: 'page',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'orderStatus',
    type: Number,
    required: false,
  })
  @ApiTags('order')
  @Get()
  getAllOrders(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('orderStatus') orderStatus: string,
  ) {
    return this.orderService.getAllOrdersWithQuery(
      +page || 1,
      +limit || 10,
      +orderStatus || undefined,
    );
  }

  // @Roles('admin', 'manager')
  @ApiTags('order')
  @UseGuards(JwtAuthGuard)
  @Post('')
  createOrder(@Body() body: CreateOrderDto, @Req() req: any) {
    return this.orderService.createOrder(req.user.id, body);
  }

  @ApiTags('order')
  @Put(':id')
  updateOrderStatus(
    @Param('id') orderId: string,
    @Query('status') status: string,
  ) {
    return this.orderService.updateOrderStatus(orderId, +status);
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
}
