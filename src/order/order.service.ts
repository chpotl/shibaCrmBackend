import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { Category, Subcategory } from './schemas/category.schema';
import { CreateBankDto } from './dtos/create-bank.dto';
import { Bank } from './schemas/bank.schema';
import { UpdateBankDto } from './dtos/update-bank.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateSubcategoryDto } from './dtos/create-subcategory.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { DeliveryMethod } from './schemas/delivery.schema';
import { CreateDeliveryMethodDto } from './dtos/create-deliveryMethod.dto';
import { Params } from './schemas/params.schema';
import { UpdateParamsDto } from './dtos/update-params.dto';
import { CreatePromocodeDto } from './dtos/create-promocode.dto';
import { Promocode } from './schemas/promocode.schema';
import { AddOrderInfoDto } from './dtos/add-orderinfo.dto';
import axios from 'axios';
import { xml2json } from 'xml-js';
import { response } from 'express';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Subcategory.name)
    private readonly subcategoryModel: Model<Subcategory>,
    @InjectModel(Bank.name)
    private readonly bankModel: Model<Bank>,
    @InjectModel(DeliveryMethod.name)
    private readonly deliveryMethodModel: Model<DeliveryMethod>,
    @InjectModel(Params.name)
    private readonly paramsModel: Model<Params>,
    @InjectModel(Promocode.name)
    private readonly promocodeModel: Model<Promocode>,
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

  async createBank(createBankDto: CreateBankDto) {
    return await this.bankModel.create(createBankDto);
  }
  async getAllBanks() {
    return await this.bankModel.find();
  }

  async updateBank(bankId: string, updateBankDto: UpdateBankDto) {
    return await this.bankModel.findByIdAndUpdate(bankId, updateBankDto);
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

  async createDeliveryMethod(createDeliveryMethodDto: CreateDeliveryMethodDto) {
    return await this.deliveryMethodModel.create(createDeliveryMethodDto);
  }

  async getAllDeliveryMethods() {
    return await this.deliveryMethodModel.find();
  }

  async getParams() {
    const response = JSON.parse(
      JSON.stringify((await this.paramsModel.find())[0]),
    );
    response.banks = JSON.parse(JSON.stringify(await this.bankModel.find()));
    return response;
  }
  async updateParams(updateParamsDto: UpdateParamsDto) {
    if (!Object.keys(updateParamsDto).length) {
      console.log(updateParamsDto);
      return new BadRequestException('fields are incorrect');
    }
    return await this.paramsModel.updateOne({}, updateParamsDto, { new: true });
  }
  async getPromocode(code: string) {
    const promocode = await this.promocodeModel.findOne({ code });
    if (!promocode) {
      return new NotFoundException('no such promocode');
    }
    return promocode;
  }

  async getAppPromocodes() {
    const allPromocodes = await this.promocodeModel.find();
    if (!allPromocodes) {
      return new NotFoundException('promocodes not found');
    }
    return allPromocodes;
  }

  async deletePromocode(code: string) {
    const promocode = await this.promocodeModel.findOne({ code });
    if (!promocode) {
      return new NotFoundException('no such promocode');
    }
    return await this.promocodeModel.findOneAndRemove({ code });
  }
  async createPromocode(createPromocodeDto: CreatePromocodeDto) {
    return await this.promocodeModel.create(createPromocodeDto);
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
