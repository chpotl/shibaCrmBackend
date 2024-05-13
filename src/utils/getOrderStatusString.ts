import { OrderState } from '../order/schemas/order.schema';

const orderStatusStr = [
  'Ожидается оплата',
  'Проверка оплаты',
  'На закупке',
  'Закуплен',
  'Доставляется на склад в Китае',
  'На складе в Китае',
  'Доставка на склад РФ',
  'На складе РФ',
  'Доставляется',
  'Завершен',
];

export const getOrderStatusStr = (orderStatus: OrderState) => {
  return orderStatusStr[orderStatus];
};
