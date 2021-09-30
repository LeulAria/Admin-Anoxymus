import { Service } from "./Service";

// types
export interface Topup {
  createdAt: string;
  modifiedAt: string;
  id: string;
  destinationNumber: string;
  sms: string;
  type: string;
  subscribedAt: string;
  cancelledAt: string;
  subscriptionId: string;
  errorCode: number;
  userId: string;
  sessionId: string;
  topupAmountId: string;
  operationId: string;
  topupSubscriptionId: string;
  topupSubscriptionPlanId: string;
  user: User;
  session: Session;
  topupAmount: TopupAmount;
  operation: Operation;
  topupSubscriptionPlan: TopupSubscriptionPlan;
  payments: Payment[];
  dtoneTransactions: DtoneTransaction[];
  additionalProp1: any;
}

export interface DtoneTransaction {
  createdAt: string;
  modifiedAt: string;
  id: string;
  country: string;
  countryid: number;
  operator: string;
  operatorid: number;
  destination_msisdn: string;
  destination_currency: string;
  local_info_currency: string;
  promotion: string;
  promo_start: string;
  promo_end: string;
  msisdn: string;
  originating_currency: string;
  product_requested: number;
  actual_product_sent: number;
  sms_sent: string;
  sms: string;
  sender_sms: string;
  sender_text: string;
  wholesale_price: string;
  service_fee: string;
  retail_price: string;
  transactionid: string;
  cid1: string;
  cid2: string;
  cid3: string;
  reference_operator: string;
  local_info_amount_: string;
  local_info_value: number;
  return_timestamp: string;
  return_version: string;
  balance: number;
  authentication_key: number;
  error_code: number;
  error_txt: string;
  info_txt: any;
  topupId: string;
  additionalProp1: any;
}

export interface Operation {
  createdAt: string;
  modifiedAt: string;
  id: string;
  name: string;
  slug: string;
  groupName: string;
  description: string;
  dtoneOperatorId: number;
  defaultDestinationNumber: string;
  canSendPersonalMessage: boolean;
  canSendAutoTopup: boolean;
  hasBonus: boolean;
  canChooseNumberFromContact: boolean;
  active: boolean;
  inputTitle: string;
  inputLabel: string;
  amountLabel: string;
  inputDescription: string;
  inputValidationRegex: string;
  inputSanitizationRegex: string;
  additionalProp1: any;
}

export interface Payment {
  createdAt: string;
  modifiedAt: string;
  id: string;
  status: string;
  amount: number;
  currency: string;
  error: string;
  providerInformation: any;
  type: string;
  topupId: string;
  userId: string;
  paymentProviderId: string;
  user: User;
  paymentProvider: PaymentProvider;
  additionalProp1: any;
}

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
  additionalProp1: any;
}

export interface User {
  createdAt: string;
  modifiedAt: string;
  id: string;
  firebaseUserId: string;
  displayName: string;
  phone: string;
  email: string;
  emailVerified: boolean;
  role: string;
  isBanned: boolean;
  isInvited: boolean;
  enablePromotionsEmail: boolean;
  enableNewsAndUpdateEmail: boolean;
  enableDiscountsEmail: boolean;
  enableRemindersEmail: boolean;
  enablePromotionsSms: boolean;
  enableNewsAndUpdateSms: boolean;
  enableDiscountsSms: boolean;
  enableRemindersSms: boolean;
  birthDate: string;
  invitationId: string;
  profilePhotoUrl: string;
  invitation: Invitation;
  additionalProp1: any;
}

export interface Invitation {
  createdAt: string;
  modifiedAt: string;
  id: string;
  inviterId: string;
  inviteeId: string;
  points: Point[];
  additionalProp1: any;
}

export interface Point {
  createdAt: string;
  modifiedAt: string;
  id: string;
  amount: number;
  for: string;
  userId: string;
  invitationId: string;
  topupId: string;
  additionalProp1: any;
}

export interface Session {
  createdAt: string;
  modifiedAt: string;
  id: string;
  userAgent: any;
  fcmToken: string;
  loginMethod: string;
  active: boolean;
  userId: string;
  clientId: string;
  additionalProp1: any;
}

export interface TopupAmount {
  createdAt: string;
  modifiedAt: string;
  id: string;
  amount: number;
  price: number;
  currency: string;
  imageUrl: string;
  isHotPackage: boolean;
  active: boolean;
  buyRewardPoint: number;
  inviteRewardPoint: number;
  operationId: string;
  operation: Operation;
  additionalProp1: any;
}

export interface TopupSubscriptionPlan {
  createdAt: string;
  modifiedAt: string;
  id: string;
  name: string;
  intervalUnit: string;
  intervalCount: number;
  active: boolean;
  topupAmountId: string;
  operationId: string;
  paypalPlanId: string;
  topupAmount: TopupAmount;
  operation: Operation;
  additionalProp1: any;
}

const route = "/topups";

export default {
  getTopupAmountsCounts: () => new Service<any, unknown>(`/topup-amounts/count`, "GET"),
  getTransactionCounts: () => new Service<any, any>(`${route}/count`, "GET"),
  getAllTransactions: (query = "") =>
    new Service<Topup[], unknown>(`${route}?${query}`, "GET"),
  deleteTransaction: (id: string) =>
    new Service<Topup[], unknown>(`${route}/${id}`, "DELETE"),
};
