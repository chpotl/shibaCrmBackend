import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Category, Subcategory } from './category.schema';
import { Bank } from './bank.schema';
import { Delivery } from './delivery.schema';

export enum OrderState {
  waitingPayment,
  paymentVerification,
  paid,
  purchaseProcess,
  purchased,
  deliveryToChina,
  inChina,
  deliveryToRussia,
  inRussia,
  finalDelivery,
  finished,
}

class PaymentMethod extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Bank' })
  bank: Bank;

  @Prop({ required: true })
  screenShotUrl: string;
}

class ContactInfo extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({})
  telegram: string;
}

class DeliveryInfo extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Delivery',
  })
  delivery: Delivery;
}

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  url: string; //link to poizon/stockx/farfetch

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category; //product category

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
  })
  subcategory: Subcategory; //product subcategory

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  unitPrice: number; //price for 1 usd/eur/cny

  @Prop({ required: true })
  productPrice: number; //product price in usd/eur/cny

  @Prop({ required: true })
  rubblePrice: number; //product price in rubbles

  @Prop({ required: true })
  marketplaceDelivery: number; //delivery price form poizon/stockx to china

  @Prop({ required: true })
  internationalDelivery: number; //delivery price form china to russia

  @Prop({ required: true })
  comission: number; //shiba comission

  @Prop({ required: true })
  totalPrice: number; //total price in rubbles

  @Prop({ required: true, default: '' })
  comment: string; //order comment

  @Prop({ required: true, default: OrderState.waitingPayment })
  orderStatus: number; //order status

  @Prop({ type: PaymentMethod })
  paymentMethod: PaymentMethod; //payment method chosen by user

  @Prop({ type: ContactInfo })
  contactInfo: ContactInfo; //payment method chosen by user

  @Prop({ type: DeliveryInfo })
  deliveryInfo: DeliveryInfo; //payment method chosen by user
}

export const OrderSchema = SchemaFactory.createForClass(Order);
