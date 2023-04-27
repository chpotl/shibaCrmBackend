export interface AddOrderInfo {
  paymentMethod: {
    bank: string;
    screenShotUrl: { path: string; mimetype: string };
  };
  contactInfo: {
    name: string;
    phone: string;
    telegram: string;
  };
  deliveryInfo: {
    name: string;
    phone: string;
    delivery: string;
  };
  promocode?: string;
}
