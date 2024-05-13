import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bot extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  chatId: string;
}

export const BotSchema = SchemaFactory.createForClass(Bot);
