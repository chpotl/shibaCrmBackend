import { Module } from '@nestjs/common';
import { PromocodeService } from './promocode.service';
import { PromocodeController } from './promocode.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promocode, PromocodeSchema } from './schemas/promocode.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Promocode.name, schema: PromocodeSchema },
    ]),
  ],
  controllers: [PromocodeController],
  providers: [PromocodeService],
})
export class PromocodeModule {}
