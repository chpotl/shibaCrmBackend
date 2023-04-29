import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ParamsService } from './params.service';
import { CreateParamDto } from './dto/create-param.dto';
import { UpdateParamsDto } from './dto/update-params.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('params')
@Controller('params')
export class ParamsController {
  constructor(private readonly paramsService: ParamsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createParamDto: CreateParamDto) {
    return this.paramsService.create(createParamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.paramsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateParamsDto: UpdateParamsDto) {
    return this.paramsService.update(updateParamsDto);
  }
}
