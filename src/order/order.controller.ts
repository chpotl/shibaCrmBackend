import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
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
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileMimetypeFilter } from '../utils/file-mimetype-filter';
import { excangeRates } from '../utils/exchange-rates';

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

  @ApiTags('order')
  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  // @Roles('admin', 'manager')
  @ApiTags('order')
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: {
        fileSize: 1 * 1024 * 1024,
      },
      fileFilter: fileMimetypeFilter('image/jpg', 'image/png', 'image/jpeg'),
    }),
  )
  @Post('')
  createOrder(
    @Body() body: CreateOrderDto,
    @Req() req: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.orderService.createOrder(req.user.id, body, files);
  }

  @ApiTags('order')
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('screenShot', {
      limits: {
        fileSize: 39300,
      },
      fileFilter: fileMimetypeFilter('image/jpg', 'image/png', 'image/jpeg'),
    }),
  )
  addOrderInfo(
    @Body() body: AddOrderInfoDto,
    @Param('id') orderId: string,
    @UploadedFile() screenShot: Express.Multer.File,
  ) {
    return this.orderService.addOrderInfo(orderId, screenShot, body);
  }

  @ApiTags('order')
  @Get(':id')
  getOrderById(@Param('id') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }
}
