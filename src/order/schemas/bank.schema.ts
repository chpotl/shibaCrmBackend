import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Bank extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cardNumber: string;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
