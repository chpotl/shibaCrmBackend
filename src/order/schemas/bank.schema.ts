import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Bank extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cardNumber: string;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
