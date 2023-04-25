import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DeliveryMethod } from './schemas/delivery.schema';
import { Model } from 'mongoose';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(DeliveryMethod.name)
    private readonly deliveryMethodModel: Model<DeliveryMethod>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    return await this.deliveryMethodModel.create(createDeliveryDto);
  }

  async findAll() {
    return await this.deliveryMethodModel.find();
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return await this.deliveryMethodModel.findByIdAndUpdate(
      id,
      updateDeliveryDto,
    );
  }

  async remove(id: number) {
    return await this.deliveryMethodModel.findByIdAndDelete(id);
  }
}
