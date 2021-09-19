import API from './API';
import { AppResponse } from './types';
import { AxiosResponse, Method } from 'axios';

interface ServiceAPI<Response, Payload> {
  get: () => Promise<AxiosResponse<AppResponse<Response>>>;
  pipe: (payload: Payload) => Promise<AxiosResponse<AppResponse<Response>>>;
}

// export class
export class Service<Response, Payload> implements ServiceAPI<Response, Payload> {
  private url = '';
  private method: Method | null = null;

  constructor(url: string, method: Method = 'get', isForm = false) {
    this.url = url;
    this.method = method;
    API.defaults.headers.common['Content-Type'] = isForm
      ? 'multipart/form-data'
      : 'application/json';
  }

  get(): Promise<AxiosResponse<AppResponse<Response>>> {
    return API({
      method: this.method as Method,
      url: this.url,
    });
  }

  pipe(payload?: Payload): Promise<AxiosResponse<AppResponse<Response>>> {
    return API({
      method: this.method as Method,
      data: payload,
      url: this.url,
    });
  }
}
