import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Params extends Document {
  @Prop({ required: true })
  CNY: number;

  @Prop({ required: true })
  USD: number;

  @Prop({ required: true })
  EUR: number;

  @Prop({ required: true })
  comission: number;

  @Prop({ required: true })
  marketplaceDelivery: number;

  @Prop({ required: true })
  internationalDelivery: number;
}

export const ParamsSchema = SchemaFactory.createForClass(Params);
