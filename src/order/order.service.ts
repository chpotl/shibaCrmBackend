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
  ) {}

  async createOrder(managerId: string, createOrderDto: CreateOrderDto) {
    return await this.orderModel.create({
      manager: managerId,
      ...createOrderDto,
    });
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
}
