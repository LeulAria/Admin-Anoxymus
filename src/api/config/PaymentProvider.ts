import { Service } from "./Service";

const route = "payment-providers";

// types
export interface PaymentProvider {
  createdAt: string;
  modifiedAt: string;
  id: string;
  name: string;
  identifier: string;
  iconUrl: string;
  activeForOneTime: boolean;
  activeForSubscription: boolean;
  order: number;
  shouldRewardPoints: boolean;
  classBindingKey: string;
}

export default {
  getPaymentProviders: () =>
    new Service<PaymentProvider[], unknown>(`${route}`, "GET"),
  createPaymentProvider: () => new Service(`${route}`, "POST"),
  updatePaymentProvider: (id: string) => new Service(`${route}/${id}`, "PUT"),
  deletePaymentProvider: (id: string) =>
    new Service(`${route}/${id}`, "DELETE"),
};
