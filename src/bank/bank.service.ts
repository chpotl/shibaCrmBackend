import { Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bank } from './schemas/bank.schema';
import { Model } from 'mongoose';

@Injectable()
export class BankService {
  constructor(
    @InjectModel(Bank.name)
    private readonly bankModel: Model<Bank>,
  ) {}
  async create(createBankDto: CreateBankDto) {
    return await this.bankModel.create(createBankDto);
  }

  async findAll() {
    return await this.bankModel.find();
  }

  async update(id: number, updateBankDto: UpdateBankDto) {
    return await this.bankModel.findByIdAndUpdate(id, updateBankDto);
  }

  remove(id: number) {
    return `This action removes a #${id} bank`; //TODO
  }
}
