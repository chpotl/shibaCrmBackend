import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParamDto } from './dto/create-param.dto';
import { UpdateParamsDto } from './dto/update-params.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Params } from './schemas/params.schema';
import { Model } from 'mongoose';
import { BankService } from 'src/bank/bank.service';

@Injectable()
export class ParamsService {
  constructor(
    @InjectModel(Params.name)
    private readonly paramsModel: Model<Params>,
    private readonly bankService: BankService,
  ) {}
  create(createParamDto: CreateParamDto) {
    return 'This action adds a new param';
  }

  async findAll() {
    const response = JSON.parse(
      JSON.stringify((await this.paramsModel.find())[0]),
    );
    response.banks = JSON.parse(
      JSON.stringify(await this.bankService.findAll()),
    );
    return response;
  }

  async update(updateParamsDto: UpdateParamsDto) {
    if (!Object.keys(updateParamsDto).length) {
      return new BadRequestException('fields are incorrect');
    }
    return await this.paramsModel.updateOne({}, updateParamsDto, { new: true });
  }
}
