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

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Subcategory.name)
    private readonly subcategoryModel: Model<Subcategory>,
  ) {}

  async createOrder(managerId: string, createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return await this.orderModel.create({
      manager: managerId,
      ...createOrderDto,
    });
  }

  async addOrderInfo(orderId: string, addOrderInfoDto: AddOrderInfoDto) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      return new NotFoundException('order not found');
    }
    return await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        ...addOrderInfoDto,
        $set: { orderStatus: OrderState.paymentVerification },
      },
      {
        new: true,
      },
    );
  }

  async updateOrderStatus(orderId: string, status: OrderState) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      return new NotFoundException('order not found');
    }
    if (!Object.values(OrderState).includes(status)) {
      return new BadRequestException('state dosent exist');
    }
    return await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        $set: { orderStatus: status },
      },
      { new: true },
    );
  }

  async getAllOrders() {
    return await this.orderModel.find();
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
      .populate('deliveryInfo.delivery category subcategory');
  }

  async getOrderById(orderId: string) {
    return await this.orderModel
      .findById(orderId)
      .populate('deliveryInfo.delivery category subcategory');
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
