import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DeliveryMethod extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
}

export const DeliveryMethodSchema =
  SchemaFactory.createForClass(DeliveryMethod);
