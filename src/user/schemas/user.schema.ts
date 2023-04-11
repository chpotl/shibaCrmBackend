import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  admin = 'admin',
  manager = 'manager',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, trim: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ default: Role.manager })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
