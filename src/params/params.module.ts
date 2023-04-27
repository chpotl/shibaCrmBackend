import { Module } from '@nestjs/common';
import { ParamsService } from './params.service';
import { ParamsController } from './params.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Params, ParamsSchema } from './schemas/params.schema';
import { BankModule } from 'src/bank/bank.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    BankModule,
    MongooseModule.forFeature([{ name: Params.name, schema: ParamsSchema }]),
  ],
  controllers: [ParamsController],
  providers: [ParamsService],
})
export class ParamsModule {}
