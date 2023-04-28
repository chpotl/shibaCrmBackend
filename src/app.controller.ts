import { Controller, Get, HttpCode, Options } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Options('*')
  @HttpCode(204)
  corsHandler() {}
}
