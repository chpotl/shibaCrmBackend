import { OrderState } from '../order/schemas/order.schema';

const orderStatusStr = [
  'Ожидается оплата',
  'Подтверждение оплаты',
  'Оплачено',
  'Доставляется на зарубежный склад',
  'Готовится к отправке в РФ',
  'Отправлено в РФ',
  'В сортировочном центре',
  'На складе Shiba',
  'Доставляется транспортной компанией',
  'Завершен',
];

export const getOrderStatusStr = (orderStatus: OrderState) => {
  return orderStatusStr[orderStatus];
};
