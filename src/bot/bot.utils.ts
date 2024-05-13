import { ExtraEditMessageText } from 'telegraf/typings/telegram-types';
import { Context } from './bot.interface';

export type BotMessage = { chatId: string; text: string };

export const replyOrEdit = async (
  ctx: Context,
  text: string,
  extra: ExtraEditMessageText,
) => {
  const messageId = ctx.update.callback_query?.message.message_id
    ? ctx.update.callback_query?.message.message_id
    : ctx.session.messageId;
  const chatId = ctx.from.id;
  if (messageId) {
    extra.parse_mode = 'HTML';
    return await ctx.telegram.editMessageText(
      chatId,
      messageId,
      undefined,
      text,
      extra,
    );
  }
  const reply = await ctx.replyWithHTML(text, extra);
  ctx.session.messageId = reply.message_id;
  return;
};

export const addPrevScene = (ctx: Context, scene: string) => {
  const state = ctx.scene.session.state;
  state.prevScene ? state.prevScene.push(scene) : (state.prevScene = [scene]);
  return state;
};
