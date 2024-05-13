import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BotService } from './bot.service';
import { Order } from 'src/order/schemas/order.schema';
import { TEXT } from './bot.constants';

@Injectable()
export class BotListener {
  constructor(private readonly botService: BotService) {}

  @OnEvent('bot.sentStatusChanage')
  async handleBotStatusChanage(order: Order) {
    const chatId = await this.botService.getChatIdByUsername(
      order.contactInfo.telegram,
    );

    this.botService.sendBaseMessage({ chatId, text: TEXT.NEW_STATUS(order) });
  }

  @OnEvent('bot.sentNewOrder')
  async handleBotNewOrder(order: Order) {
    const chatId = await this.botService.getChatIdByUsername(
      order.contactInfo.telegram,
    );

    this.botService.sendBaseMessage({ chatId, text: TEXT.NEW_ORDER(order) });
  }

  @OnEvent('bot.sentCancelOrder')
  async handleBotCancelOrder(order: Order) {
    const chatId = await this.botService.getChatIdByUsername(
      order.contactInfo.telegram,
    );

    this.botService.sendBaseMessage({ chatId, text: TEXT.CANCEL_ORDER(order) });
  }
}
