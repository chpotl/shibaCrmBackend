import { Order } from 'src/order/schemas/order.schema';
import { getOrderStatusStr } from 'src/utils/getOrderStatusString';
import { Markup } from 'telegraf';

export const BotName = 'ShibaBot';

export const SCENE = {
  ABOUT: 'ABOUT_SCENE',
  CONTACTS: 'CONTACTS_SCENE',
  TRACK: 'TRACK_SCENE',
};

export const COMMANDS = {
  START: 'START',
  BACK: 'BACK',
  ABOUT: 'ABOUT',
  CONTACTS: 'CONTACTS',
  TRACK: 'TRACK',
  MAIN_MENU: 'MAIN_MENU',
};

export const BUTTONS = {
  BACK: Markup.button.callback('назад', COMMANDS.BACK),
  ABOUT: Markup.button.callback('о нас', COMMANDS.ABOUT),
  CONTACTS: Markup.button.callback('контакты', COMMANDS.CONTACTS),
  TRACK: Markup.button.callback('отследить', COMMANDS.TRACK),
  MAIN_MENU: Markup.button.callback('меню', COMMANDS.MAIN_MENU),
};

export const TEXT = {
  START: (username: string) => {
    return `Привет @${username}! Я виртуальный ассистент ShibaMag 🌟\nЧем я могу помочь?\n\nСо мной ты можешь отслеживать все свои заказы и получать уведомления об изменении статуса доставки 🛍️`;
  },
  ABOUT: `Ну что же… Вот и пришло время познакомиться поближе\n\nО том, кто мы и какие у нас планы, вы можете узнать из видео выше\n\nА также, если вы еще не знаете о других наших соц. сетях - можете найти их по этой ссылке: https://linktr.ee/shibashipping\n\nКстати, в Inst мы ежедневно постим классные рилсы, которые вы не увидите в телеграмме, поэтому с радостью ждём вас там!🫂`,
  CONTACTS: `Чтобы не пропустить ни единой новости - подписывайтесь на наши соцсети👇\n\n<a href="https://t.me/shibashipping">Основной канал</a>\n<a href="https://t.me/nikitapakhomovv">Связаться с менеджером</a><a href="https://instagram.com/shiba_shipping">\n\ninstagram</a> | <a href='https://www.youtube.com/@shibashipping/shorts'>youtube</a> | <a href='https://dzen.ru/id/638e0dc4e4bbcb36ce5a7993'>Дзэн</a> | <a href='https://vk.com/shibashipping'>ВК</a>`,
  TRACK: (orders: Order[]) =>
    orders.length
      ? orders.reduce((response, order) => {
          return (
            response +
            `📦 Заказ <a href="https://shiba-shipping.netlify.app/order/${
              order.id
            }">${order.id.slice(-4)}</a>\nНазвание: <b>${order.brand} ${
              order.model
            } - ${order.size}</b>\nСтатус: <b>${getOrderStatusStr(
              order.orderStatus,
            )}</b>\nДней в пути: <b>${(
              (Date.now() - new Date(order.createdAt).getTime()) /
              8640000
            ).toFixed(0)}</b>\n\n`
          );
        }, `🟢 Активные заказы:\n\n`)
      : `🤷‍♂️ Список заказов пуст...\n\nСделайте заказ у менеджера @shibaorder\nили подберите себе образ в нашем телеграм канале @shibamag`,

  NEW_STATUS: (order: Order) => {
    return `📦 <b>Информация по заказу <a href="https://shiba-shipping.netlify.app/order/${
      order.id
    }">[${order.id.slice(-4)}]</a></b>\nНазвание: <b>${order.brand} ${
      order.model
    } - ${order.size}</b>\nНовый статус: <b>${getOrderStatusStr(
      order.orderStatus,
    ).toLowerCase()}</b>`;
  },
  NEW_ORDER: (order: Order) => {
    return `🎉 <b>Получен новый заказ <a href="https://shiba-shipping.netlify.app/order/${
      order.id
    }">[${order.id.slice(-4)}]</a></b>\nНазвание: <b>${order.brand} ${
      order.model
    } - ${order.size}</b>\n\nСпасибо, что доверяете нам ❤️`;
  },
  CANCEL_ORDER: (order: Order) => {
    return `❌ <b>Заказ [${order.id.slice(
      -4,
    )}] был отменен</b>\n\nЕсли произошла ошибка, пожалуйста свяжитесь с менеджером @shibaorder`;
  },
};
