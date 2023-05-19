import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Category, Subcategory } from './category.schema';
import { Bank } from 'src/bank/schemas/bank.schema';
import { DeliveryMethod } from 'src/delivery/schemas/delivery.schema';

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

export enum Currency {
  USD = 'USD',
  CNY = 'CNY',
  EUR = 'EYR',
}

@Schema()
class PaymentMethod extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Bank' })
  bank: Bank;

  @Prop({ required: true })
  screenShotUrl: string;
}
const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);

@Schema()
class ContactInfo extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({})
  telegram: string;
}
const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);

@Schema()
class DeliveryInfo extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryMethod',
  })
  delivery: DeliveryMethod;
}
const DeliveryInfoSchema = SchemaFactory.createForClass(DeliveryInfo);

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class Order extends Document {
  @Prop({ required: true })
  url: string; //link to poizon/stockx/farfetch

  @Prop({ required: true })
  brand: string;

  @Prop()
  model: string;

  @Prop()
  size: string;

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

  @Prop({ required: true, enum: Currency })
  currency: Currency; //product price in usd/eur/cny

  @Prop({ required: true })
  productPrice: number; //product price in usd/eur/cny

  @Prop({ required: true })
  rubblePrice: number; //product price in rubbles

  @Prop({ required: true })
  marketplaceDelivery: number; //delivery price form poizon/stockx to china

  @Prop({ required: true })
  internationalDelivery: number; //delivery price form china to russia

  @Prop({ required: true })
  insurance: number; //insurance

  @Prop()
  promocode: string; //promocode

  @Prop({ required: true })
  comission: number; //shiba comission

  // @Prop({ required: true })
  // totalPrice: number; //total price in rubbles

  @Prop({ default: '' })
  comment: string; //order comment

  @Prop({
    required: true,
    default: OrderState.waitingPayment,
    enum: OrderState,
  })
  orderStatus: number; //order status

  @Prop({ type: PaymentMethodSchema })
  paymentMethod: PaymentMethod; //payment method chosen by user

  @Prop({ type: ContactInfoSchema })
  contactInfo: ContactInfo; //payment method chosen by user

  @Prop({ type: DeliveryInfoSchema })
  deliveryInfo: DeliveryInfo; //payment method chosen by user

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  manager: User;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ default: false })
  showLink: boolean;

  @Prop({ default: false })
  showDetails: boolean;

  totalPrice: number;
}

const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.virtual('totalPrice').get(function (this: Order & Document) {
  return (
    this.rubblePrice +
    this.marketplaceDelivery +
    this.internationalDelivery +
    this.insurance +
    this.comission
  );
});

export { OrderSchema };
