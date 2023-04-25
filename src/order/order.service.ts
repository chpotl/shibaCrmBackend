import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { Category, Subcategory } from './schemas/category.schema';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateSubcategoryDto } from './dtos/create-subcategory.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { AddOrderInfoDto } from './dtos/add-orderinfo.dto';
import axios from 'axios';
import { xml2json } from 'xml-js';

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
    return await this.orderModel.findByIdAndUpdate(orderId, addOrderInfoDto, {
      new: true,
    });
  }

  async getAllOrders() {
    return await this.orderModel.find();
  }

  async getOrderById(orderId: string) {
    return await this.orderModel.findById(orderId);
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

  async excangeRates() {
    const arr = ['USD', 'EUR', 'CNY'];
    const xml = await (
      await axios.get('http://www.cbr.ru/scripts/XML_daily.asp')
    ).data;
    const res = [];
    const rate = JSON.parse(xml2json(xml)).elements[0].elements;
    for (let el of rate) {
      if (arr.includes(el.elements[1].elements[0].text)) {
        res.push(parseFloat(el.elements[4].elements[0].text.replace(',', '.')));
      }
    }
    res[0] += 5;
    res[1] += 5;
    res[2] += 1;
    return {
      USD: parseFloat(res[0].toFixed(2)),
      EUR: parseFloat(res[1].toFixed(2)),
      CNY: parseFloat(res[2].toFixed(2)),
    };
  }
}
