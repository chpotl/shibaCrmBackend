import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { COMMANDS, SCENE } from '../bot.constants';
import { BotService } from '../bot.service';
import { Context } from '../bot.interface';
import { addPrevScene } from '../bot.utils';

@Scene(SCENE.ABOUT)
export class AboutScene {
  constructor(private readonly botService: BotService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    addPrevScene(ctx, SCENE.ABOUT);
    await this.botService.about(ctx);
    return;
  }

  @Action(COMMANDS.MAIN_MENU)
  async onMainMenuAction(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
    await ctx.scene.leave();
    return;
  }
}
