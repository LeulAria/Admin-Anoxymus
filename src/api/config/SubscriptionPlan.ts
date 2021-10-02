import { Service } from "./Service";


// types

export interface SubscriptionPlan {
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
}


const route = "/topup-subscription-plans";

export default {
    getSubscriptionPlans: () => new Service<any, any>(`${route}`, "GET"),
}