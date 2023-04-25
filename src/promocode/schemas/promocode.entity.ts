import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { promoType } from '../enums/promocode.enum';

@Schema()
export class Promocode extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true, enum: promoType })
  type: promoType;

  @Prop({ required: true })
  amount: number;
}

export const PromocodeSchema = SchemaFactory.createForClass(Promocode);
