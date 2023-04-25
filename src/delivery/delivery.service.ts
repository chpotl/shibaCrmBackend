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

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return `This action updates a #${id} delivery`; //TODO
  }

  remove(id: number) {
    return `This action removes a #${id} delivery`; //TODO
  }
}
