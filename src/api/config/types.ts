export interface AppResponse<Data> {
  success?: boolean;
  data: ResponseData<Data>;
}

export interface ResponseData<Data> {
  meta_data: MetaData;
  data: Data;
}

export interface MetaData {
  page: number;
  per_page: number;
  page_count: number;
  total_count: number;
  links: Link[];
}

export interface ErrorData {
  success: boolean;
  errors:  Errors;
}

export interface Errors {
  code:   number;
  source: string;
  title:  string;
}

export interface Link {
  self?: string;
  first?: string;
  previous?: string;
  next?: string;
  last?: string;
}

export enum Sort {
  DESC = 'DESC',
  ASC = 'ASC',
}

export type Status = "BLOCKED" | "UNBLOCKED";
