import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';

export interface DictionaryAll {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: DictionaryAllItem[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface DictionaryAllItem {
  dictionaryTitle: string;
  dictionaryId: number;
}

const BASE_URL = '/api/v1/Dictionaries/all';

export class DictionaryAllHttp {
  static async getAll(pageIndex: number, pageSize: number): Promise<AxiosResponse<DictionaryAll>> {
    const response: AxiosResponse<DictionaryAll> = await axiosInstance.get(`${BASE_URL}`, {
      params: {
        pageIndex,
        pageSize,
      },
    });

    return response;
  }
}
