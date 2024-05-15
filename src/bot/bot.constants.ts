import { Order } from 'src/order/schemas/order.schema';
import { getOrderStatusStr } from '../utils/getOrderStatusString';
import { Markup } from 'telegraf';

export const BotName = 'ShibaBot';

export const SCENE = {
  CONTACTS: 'CONTACTS_SCENE',
  TRACK: 'TRACK_SCENE',
};

export const COMMANDS = {
  START: 'START',
  BACK: 'BACK',
  CONTACTS: 'CONTACTS',
  TRACK: 'TRACK',
  MAIN_MENU: 'MAIN_MENU',
};

export const BUTTONS = {
  BACK: Markup.button.callback('назад', COMMANDS.BACK),
  CONTACTS: Markup.button.callback('контакты', COMMANDS.CONTACTS),
  TRACK: Markup.button.callback('отследить', COMMANDS.TRACK),
  MAIN_MENU: Markup.button.callback('меню', COMMANDS.MAIN_MENU),
};

export const TEXT = {
  START: (username: string) => {
    return `Привет @${username}! Я виртуальный ассистент ShibaMag 🌟\nЧем я могу помочь?\n\nСо мной ты можешь отслеживать все свои заказы и получать уведомления об изменении статуса доставки 🛍️`;
  },
  CONTACTS: `Если вдруг потеряли нас, то вот наши контакты:\n\n🧑‍💻 <a href="https://t.me/shibaorder">Менеджер</a>\n🛍️ <a href="https://t.me/shibamag">Shiba Store</a>\n♻️ <a href="https://t.me/shibamarketplace">Shiba Market</a>\n📱 <a href="https://www.instagram.com/shiba.mag">Instagram</a>`,
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
