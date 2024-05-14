import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { BankModule } from './bank/bank.module';
import { DeliveryModule } from './delivery/delivery.module';
import { PromocodeModule } from './promocode/promocode.module';
import { ParamsModule } from './params/params.module';
import { FilesModule } from './files/files.module';
import { BotModule } from './bot/bot.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECT),
    AuthModule,
    UserModule,
    OrderModule,
    DeliveryModule,
    BankModule,
    PromocodeModule,
    ParamsModule,
    FilesModule,
    BotModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
