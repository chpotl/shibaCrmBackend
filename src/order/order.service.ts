import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderState } from './schemas/order.schema';
import { Model } from 'mongoose';
import { Category, Subcategory } from './schemas/category.schema';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateSubcategoryDto } from './dtos/create-subcategory.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AddOrderInfoDto } from './dtos/add-orderinfo.dto';
import * as fs from 'fs';
import { join } from 'path';
import { AddOrderInfo } from './interfaces/add-order-info.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateOrderComment } from './dtos/update-order-comment.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Subcategory.name)
    private readonly subcategoryModel: Model<Subcategory>,
    private eventEmitter: EventEmitter2,
  ) {}

  async createOrder(managerId: string, createOrderDto: CreateOrderDto) {
    return await this.orderModel.create({
      manager: managerId,
      ...createOrderDto,
    });
  }

  async updateIsPaidPartially(orderId: string, isPaidPartially: boolean) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      return new NotFoundException('order not found');
    }
    return await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        $set: { isPaidPartially },
      },
      { new: true },
    );
  }

  async addOrderInfo(orderId: string, addOrderInfoDto: AddOrderInfoDto) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      return new NotFoundException('order not found');
    }

    const match =
      addOrderInfoDto.contactInfo.telegram.match(/[a-zA-Z0-9_]{5,}/);
    addOrderInfoDto.contactInfo.telegram = match ? match[0] : '';

    const newOrder = await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        ...addOrderInfoDto,
        $set: { orderStatus: OrderState.paymentVerification },
      },
      {
        new: true,
      },
    );

    this.eventEmitter.emit('bot.sentNewOrder', newOrder);

    return newOrder;
  }

  async updateOrderStatus(orderId: string, status: OrderState) {
    if (!Number.isInteger(status)) {
      throw new BadRequestException('status nust be int');
    }
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      return new NotFoundException('order not found');
    }
    if (!Object.values(OrderState).includes(status)) {
      return new BadRequestException('state dosent exist');
    }

    const newOrder = await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        $set: { orderStatus: status },
      },
      { new: true },
    );

    this.eventEmitter.emit('bot.sentStatusChanage', newOrder);

    return newOrder;
  }

  async updateOrderComment(orderId: string, body: UpdateOrderComment) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      return new NotFoundException('order not found');
    }
    const newOrder = await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        $set: { comment: body.comment, 'deliveryInfo.track': body.track },
      },
      { new: true },
    );
    if (order.deliveryInfo.track != newOrder.deliveryInfo.track) {
      this.eventEmitter.emit('bot.sentNewTrack', newOrder);
    }
    return newOrder;
  }

  async getAllOrders() {
    return await this.orderModel.find().sort({ createdAt: -1 });
  }

  async getAllOrdersByUserTg(telegram: string) {
    return await this.orderModel.find({
      'contactInfo.telegram': telegram,
      orderStatus: { $ne: 9 },
    });
  }

  async getAllOrdersWithQuery(
    page: string | undefined,
    limit: string | undefined,
    orderStatus: string | undefined,
    search: string | undefined,
  ) {
    let options: any = {};
    if (search) {
      const regEx = new RegExp(search, 'i');
      options = {
        $or: [
          { id: regEx },
          { url: regEx },
          { brand: regEx },
          { model: regEx },
          { size: regEx },
          { 'contactInfo.name': regEx },
          { 'contactInfo.phone': regEx },
          { 'contactInfo.telegram': regEx },
          { 'deliveryInfo.name': regEx },
          { 'deliveryInfo.phone': regEx },
          { 'deliveryInfo.address': regEx },
        ],
      };
    }
    if (orderStatus) {
      options.orderStatus = orderStatus;
    }
    const _page: number = parseInt(page) || 1;
    const _limit: number = parseInt(limit) || 10;
    return await this.orderModel
      .find(options)
      .limit(_limit)
      .skip((_page - 1) * _limit)
      .sort({ createdAt: -1 })
      .populate('deliveryInfo.delivery category subcategory');
  }

  async getOrderById(orderId: string) {
    return await this.orderModel
      .findById(orderId)
      .populate(
        'deliveryInfo.delivery category subcategory paymentMethod.bank',
      );
  }

  async deleteOrder(orderId: string) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException(`order with id:${orderId} not found`);
    }
    this.eventEmitter.emit('bot.sentCancelOrder', order);
    return await this.orderModel.findByIdAndRemove(orderId);
  }

  async getAllCategories() {
    const res = await this.categoryModel.find().populate('subcategory');
    return res;
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.create(createCategoryDto);
  }
  async createSubategory(
    categoryId: string,
    createSubcategoryDto: CreateSubcategoryDto,
  ) {
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      return new NotFoundException('no category with such id');
    }
    const newSubcategory = await this.subcategoryModel.create(
      createSubcategoryDto,
    );
    if (!newSubcategory) {
      return new BadRequestException('unable to create new subcategory');
    }
    return await this.categoryModel.findByIdAndUpdate(categoryId, {
      $push: { subcategory: newSubcategory._id },
    });
  }
}
