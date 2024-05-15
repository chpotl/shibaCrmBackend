import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Ctx, InjectBot } from 'nestjs-telegraf';
import { BUTTONS, BotName, TEXT } from './bot.constants';
import { Markup, Telegraf } from 'telegraf';
import { Context } from './bot.interface';
import { BotMessage, replyOrEdit } from './bot.utils';
import { OrderService } from 'src/order/order.service';
import { InjectModel } from '@nestjs/mongoose';
import { Bot } from './schemas/bot.schema';
import { Model } from 'mongoose';

@Injectable()
export class BotService {
  constructor(
    @InjectBot(BotName)
    private readonly bot: Telegraf,
    private orderService: OrderService,
    @InjectModel(Bot.name) private readonly botModel: Model<Bot>,
  ) {}

  async sendBaseMessage(message: BotMessage) {
    await this.bot.telegram.sendMessage(message.chatId, message.text, {
      parse_mode: 'HTML',
    });
    return;
  }

  async getChatIdByUsername(username: string) {
    const botEntity = await this.botModel.find({ username });
    if (botEntity.length > 1) {
      throw new Error('Too many bot entities');
    }
    return botEntity[0].chatId;
  }

  async start(@Ctx() ctx: Context) {
    if (!ctx.from.username) {
      throw new Error(
        '⚠️ Перед использованием бота необходимо создать имя пользователя',
      );
    }

    await this.botModel.findOneAndUpdate(
      { username: ctx.from.username },
      {
        $setOnInsert: {
          username: ctx.from.username,
          chatId: ctx.chat.id,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    const buttons = [BUTTONS.CONTACTS, BUTTONS.TRACK];
    const inlineButtons = Markup.inlineKeyboard(buttons);
    return replyOrEdit(ctx, TEXT.START(ctx.from.username), inlineButtons);
  }

  async contacts(ctx: Context) {
    const buttons = [BUTTONS.MAIN_MENU];
    const inlineButtons = Markup.inlineKeyboard(buttons);
    return replyOrEdit(ctx, TEXT.CONTACTS, inlineButtons);
  }

  async track(ctx: Context) {
    const buttons = [BUTTONS.MAIN_MENU];
    const inlineButtons = Markup.inlineKeyboard(buttons);
    const orders = await this.orderService.getAllOrdersByUserTg(
      ctx.from.username,
    );
    return replyOrEdit(ctx, TEXT.TRACK(orders), inlineButtons);
  }
}
