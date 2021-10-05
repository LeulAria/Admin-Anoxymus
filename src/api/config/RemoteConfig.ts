import { Service } from "./Service";

// types
export interface RemoteConfig {
    canDelete: boolean;
    id: string;
    key: string;
    value: boolean;
}

export interface RemoteConfigPost {
    canDelete: boolean;
    key: string;
    value: boolean;
}

const route = '/remote-configs';

export default {
    getRemoteConfigs: () => new Service<any, any>(`${route}`, "GET"),
    addRemoteConfig: () => new Service<any, any>(`${route}`, "POST"),
    updateRemoteConfig: (id: string) => new Service<any, any>(`${route}/${id}`, "PUT"),
    removeRemoteConfig: (id: string) => new Service<any, any>(`${route}/${id}`, "DELETE")
}