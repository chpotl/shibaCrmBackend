import { Action, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { BotFilter } from './bot.filter';
import { UseFilters } from '@nestjs/common';
import { BUTTONS, BotName, COMMANDS, SCENE, TEXT } from './bot.constants';
import { Markup, Telegraf } from 'telegraf';
import { BotService } from './bot.service';
import { Context } from './bot.interface';
import { replyOrEdit } from './bot.utils';

@Update()
@UseFilters(BotFilter)
export class BotUpdate {
  constructor(
    @InjectBot(BotName)
    private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log('Start event', ctx);
    ctx.session.messageId = undefined;
    await this.botService.start(ctx);
    return;
  }

  @Action(COMMANDS.ABOUT)
  async onAbout(@Ctx() context: Context) {
    await context.scene.enter(SCENE.ABOUT);
  }

  @Action(COMMANDS.CONTACTS)
  async onContacts(@Ctx() context: Context) {
    await context.scene.enter(SCENE.CONTACTS);
  }

  @Action(COMMANDS.TRACK)
  async onTrack(@Ctx() context: Context) {
    await context.scene.enter(SCENE.TRACK);
  }
}
