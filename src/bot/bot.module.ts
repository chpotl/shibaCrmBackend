import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotName } from './bot.constants';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { AboutScene } from './scenes/about.scene';
import { ContactsScene } from './scenes/contacts.scene';
import { OrderModule } from 'src/order/order.module';
import { OrderService } from 'src/order/order.service';
import { TrackScene } from './scenes/track.scene';
import { MongooseModule } from '@nestjs/mongoose';
import { Bot, BotSchema } from './schemas/bot.schema';
import { BotListener } from './bot.listener';
import { session } from 'telegraf';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bot.name, schema: BotSchema }]),
    TelegrafModule.forRootAsync({
      botName: BotName,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [session()],
        include: [BotModule],
        // launchOptions: {
        //   webhook: {
        //     domain:
        //       process.env.NODE_ENV === 'dev'
        //         ? process.env.BOT_WEBHOOK
        //         : `https://${process.env.RENDER_EXTERNAL_HOSTNAME}`,
        //     path: '/bot',
        //   },
        // },
      }),
    }),
    OrderModule,
  ],
  providers: [
    BotService,
    BotUpdate,
    AboutScene,
    ContactsScene,
    TrackScene,
    BotListener,
  ],
})
export class BotModule {}