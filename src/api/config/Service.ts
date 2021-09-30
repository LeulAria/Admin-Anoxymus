import API from "./API";
import { AxiosResponse, Method } from "axios";

interface ServiceAPI<Response, Payload> {
  get: () => Promise<AxiosResponse<Response>>;
  pipe: (payload: Payload) => Promise<AxiosResponse<Response>>;
}

// return a Form Data from json
export const getFormData = <T>(payload: T): FormData =>
  Object.entries(payload).reduce((formData, key) => {
    formData.append(key[0], key[1]);
    return formData;
  }, new FormData());

// export class
export class Service<Response, Payload>
  implements ServiceAPI<Response, Payload>
{
  private url = "";
  private parseJsonForm = false;
  private method: Method | null = null;

  constructor(
    url: string,
    method: Method = "get",
    isForm = false,
    parseJsonToForm = false
  ) {
    this.url = url;
    this.method = method;
    this.parseJsonForm = parseJsonToForm;
    API.defaults.headers.common["Content-Type"] = isForm
      ? "multipart/form-data"
      : "application/json";
  }

  get(): Promise<AxiosResponse<Response>> {
    return API({
      method: this.method as Method,
      url: this.url,
    });
  }

  pipe(payload?: Payload): Promise<AxiosResponse<Response>> {
    return API({
      method: this.method as Method,
      url: this.url,
      data: this.parseJsonForm ? getFormData(payload) : payload,
    });
  }
}
