import { Service } from "./Service";

export default {
  todo: () => new Service<any, any>(`/todos`, 'get')
}