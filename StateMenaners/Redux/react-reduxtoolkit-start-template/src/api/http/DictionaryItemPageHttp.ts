import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';

export interface IDictionaryItemPage {
  id: number;
  settings: ISettingsDictionaryItemPage;
  supportsVersioning: boolean;
  hierarchical: boolean;
  fields: IField[];
  keys: any[];
  dictionaryUsage: number[];
  guid: string;
  parentDictionaryFieldName: any;
  title: string;
  singleTitle: string;
  description: any;
}

export interface ISettingsDictionaryItemPage {
  cardActionsList: number[];
  childrenState: number;
  childrenTabsState: number;
  disablePermissionCheck: any[];
  resizableGrid: boolean;
  hiddenListColumns: any[];
  hiddenListMenus: any[];
  fileHandlers: any[];
}

export interface IField {
  id: number;
  lookupDictionaryId: any;
  guid: string;
  fieldType: number;
  group: any;
  hidden: boolean;
  hiddenListDefault: boolean;
  listWidth: number;
  internalName: string;
  fieldUsage: number[];
  displayMode: number;
  visibility: number[];
  lookupDictionariesFilter: any;
  markup: any;
  regex: any;
  title: string;
  listTitle: any;
  description: any;
  readOnly: boolean;
  required: boolean;
  size?: number;
  defaultValue: any;
  maxValue?: number;
  minValue?: number;
  regexPatternValue: any;
  choices: any[];
}

// ==========for items===========
export interface IDictionaryItemPageItems {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: IDictionaryItemPageItem[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IDictionaryItemPageItem {
  guid: string;
  lookupFields: any[];
  fields: IDictionaryItemPageItemsFields;
}

export interface IDictionaryItemPageItemsFields {
  _ID_: number;
  _GUID_: string;
  _OWNER_: string;
  _DELETED_: any;
  _CREATE_DATE_: string;
  _MODIFY_DATE_: string;
  _DICTIONARYID_: number;
  [key: string]: any;
}

const BASE_URL = 'api/v1/Dictionaries';

export class DictionaryItemPageHttp {
  static async getDictionaryItemPage(dictionaryId: any): Promise<AxiosResponse<IDictionaryItemPage>> {
    const response: AxiosResponse<IDictionaryItemPage> = await axiosInstance.get(`${BASE_URL}/${dictionaryId}`, {});
    return response;
  }

  static async getDictionaryItemPageItems(
    dictionaryId: any,
    pageIndex: number,
    pageSize: number
  ): Promise<AxiosResponse<IDictionaryItemPageItems>> {
    const response: AxiosResponse<IDictionaryItemPageItems> = await axiosInstance.get(
      `${BASE_URL}/${dictionaryId}/items`,
      {
        params: {
          pageIndex,
          pageSize,
        },
      }
    );
    return response;
  }
}
