import { CustomFormulaRepositoryKeys } from '../../modules/currencyExchanger/components/CurrencyExchanger/components/Calcularot/Calculator.formulas';
import { api } from './api';

export interface PairListItem {
  symbol: string;
  base: string;
  quote: string;
  formula_type: 'default' | 'custom';
  formula_id?: CustomFormulaRepositoryKeys;
}

export interface PairPrice {
  symbol: string;
  price: string;
  timestamp: number;
}

export interface PairFee {
  symbol: string;
  fee: string;
  min_amount: string;
  max_amount: string;
  timestamp: number;
}

const symbolsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSymbols: build.query<PairListItem[], void>({
      // note: an optional `queryFn` may be used in place of `query`
      query: () => ({ url: `/symbols` }),
      // Pick out data and prevent nested properties in a hook or selector
      // transformResponse: (response: { data: Post }) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: () => [{ type: 'PairList' }],
    }),
    getPrice: build.query<PairPrice, string>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (symbol) => ({ url: `/prices?symbol=${symbol}` }),
      transformResponse: (response: PairPrice[]) => response[0],

      // providesTags: () => [{ type: 'PairList' }],
    }),
    getFee: build.query<PairFee, string>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (symbol) => ({ url: `/fee?symbol=${symbol}` }),
      transformResponse: (response: PairFee[]) => response[0],

      // providesTags: () => [{ type: 'PairList' }],
    }),
    // The query accepts a number and returns a Post
    // getPost: build.query<Post, number>({
    //   // note: an optional `queryFn` may be used in place of `query`
    //   query: (id) => ({ url: `post/${id}` }),
    //   // Pick out data and prevent nested properties in a hook or selector
    //   // transformResponse: (response: { data: Post }) => response.data,
    //   // Pick out errors and prevent nested properties in a hook or selector
    //   transformErrorResponse: (response: { status: string | number }) => response.status,
    //   providesTags: (result, error, id) => [{ type: 'Post', id }],
    // }),

    // deletePost: build.mutation<void, number>({
    //   query: (id) => ({
    //     method: 'DELETE',
    //     url: `/posts/${id}`,
    //   }),
    //   invalidatesTags: ['Post'],
    // }),
  }),
  // overrideExisting: true
});

export const { useGetSymbolsQuery, useGetPriceQuery, useGetFeeQuery } = symbolsApi;
