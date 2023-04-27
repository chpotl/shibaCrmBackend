import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Promocode } from './schemas/promocode.schema';
import { Model } from 'mongoose';

@Injectable()
export class PromocodeService {
  constructor(
    @InjectModel(Promocode.name)
    private readonly promocodeModel: Model<Promocode>,
  ) {}
  async create(createPromocodeDto: CreatePromocodeDto) {
    return await this.promocodeModel.create(createPromocodeDto);
  }

  async findAll() {
    const allPromocodes = await this.promocodeModel.find();
    if (!allPromocodes) {
      return new NotFoundException('promocodes not found');
    }
    return allPromocodes;
  }

  async findOne(code: string) {
    const promocode = await this.promocodeModel.findOne({ code });
    if (!promocode) {
      return new NotFoundException('no such promocode');
    }
    return promocode;
  }

  async update(code: string, updatePromocodeDto: UpdatePromocodeDto) {
    return await this.promocodeModel.findOneAndUpdate(
      { code },
      updatePromocodeDto,
    );
  }

  async remove(code: string) {
    const promocode = await this.promocodeModel.findOne({ code });
    if (!promocode) {
      return new NotFoundException('no such promocode');
    }
    return await this.promocodeModel.findOneAndRemove({ code });
  }
}
