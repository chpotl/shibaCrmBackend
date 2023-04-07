import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';
import {
  Category,
  CategorySchema,
  Subcategory,
  SubcategorySchema,
} from './schemas/category.schema';
import { Bank, BankSchema } from './schemas/bank.schema';
import { Delivery, DeliverySchema } from './schemas/delivery.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: Bank.name, schema: BankSchema },
      { name: Delivery.name, schema: DeliverySchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
