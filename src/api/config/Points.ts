import { Service } from "./Service";

const route = "/points";

export default {
    getPointsCount: () => new Service<any, unknown>(`${route}/count`, "GET")
}