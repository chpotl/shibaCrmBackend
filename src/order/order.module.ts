import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';
import {
  Category,
  CategorySchema,
  Subcategory,
  SubcategorySchema,
} from './schemas/category.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Subcategory.name, schema: SubcategorySchema },
    ]),
    MulterModule.register({
      dest: '/tmp',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
