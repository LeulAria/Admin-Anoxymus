import { Service } from "./Service";

// types

export interface TopupAmount {
    createdAt:         string;
    modifiedAt:        string;
    id:                string;
    amount:            number;
    price:             number;
    currency:          string;
    isHotPackage:      boolean;
    active:            boolean;
    buyRewardPoint:    number;
    inviteRewardPoint: number;
    operationId:       string;
}

const route = '/topup-amounts'

export default {
    getTopupAmounts: () => new Service<TopupAmount[], unknown>(`${route}`, "GET"),
    createTopupAmount: () => new Service(`${route}`, "POST"),
    updateTopupAmount: (id: string) => new Service(`${route}/${id}`, "PATCH"),
    deleteTopupAmount: (id: string) => new Service(`${route}/${id}`, "DELETE") 
}