import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bank extends Document {
  @Prop({ required: true, unique: true })
  bank: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cardNumber: string;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
