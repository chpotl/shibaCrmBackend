import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { Category, Subcategory } from './schemas/category.schema';
import { CreateBankDto } from './dtos/create-bank.dto';
import { Bank } from './schemas/bank.schema';
import { UpdateBankDto } from './dtos/update-bank.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Subcategory.name)
    private readonly subcategoryModel: Model<Subcategory>,
    @InjectModel(Bank.name)
    private readonly bankModel: Model<Bank>,
  ) {}

  async createBank(createBankDto: CreateBankDto) {
    return await this.bankModel.create(createBankDto);
  }
  async getAllBanks() {
    return await this.bankModel.find();
  }

  async updateBank(bankId: string, updateBankDto: UpdateBankDto) {
    return await this.bankModel.findByIdAndUpdate(bankId, updateBankDto);
  }
}
