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

  async createOrder(
    managerId: string,
    createOrderDto: CreateOrderDto,
    files: Array<Express.Multer.File>,
  ) {
    const images = files.map(
      (el) => new Object({ path: el.path, mimetype: el.mimetype }),
    );
    return await this.orderModel.create({
      manager: managerId,
      images,
      ...createOrderDto,
    });
  }

  async addOrderInfo(
    orderId: string,
    screenShot: Express.Multer.File,
    addOrderInfoDto: AddOrderInfoDto,
  ) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      console.log(join(screenShot.destination, screenShot.filename));
      fs.rm(join(screenShot.destination, screenShot.filename), (e) => {
        console.log('removed ', e);
      });
      return new NotFoundException('order not found');
    }
    console.log(screenShot);

    const updateObj: AddOrderInfo = {
      paymentMethod: {
        bank: addOrderInfoDto.bank,
        screenShotUrl: { path: screenShot.path, mimetype: screenShot.mimetype },
      },
      contactInfo: {
        name: addOrderInfoDto.contactName,
        phone: addOrderInfoDto.contactPhone,
        telegram: addOrderInfoDto.contactTelegram,
      },
      deliveryInfo: {
        name: addOrderInfoDto.deliveryName,
        phone: addOrderInfoDto.deliveryPhone,
        delivery: addOrderInfoDto.deliveryType,
      },
      promocode: addOrderInfoDto.promocode,
    };
    return await this.orderModel.findByIdAndUpdate(orderId, updateObj, {
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
}
