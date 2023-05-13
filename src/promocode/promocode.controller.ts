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
import { PromocodeService } from './promocode.service';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('promocode')
@Controller('promocode')
export class PromocodeController {
  constructor(private readonly promocodeService: PromocodeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPromocodeDto: CreatePromocodeDto) {
    return this.promocodeService.create(createPromocodeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.promocodeService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.promocodeService.findOne(code);
  }

  @Patch(':code')
  update(
    @Param('id') id: string,
    @Body() updatePromocodeDto: UpdatePromocodeDto,
  ) {
    return this.promocodeService.update(id, updatePromocodeDto);
  }

  @Delete(':code')
  remove(@Param('id') id: string) {
    return this.promocodeService.remove(id);
  }
}
