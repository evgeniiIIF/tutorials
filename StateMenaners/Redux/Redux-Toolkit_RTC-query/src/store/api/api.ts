// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['Post', 'PairList'],
  endpoints: () => ({}),
});

// export const { useGetPostsQuery, useGetPostQuery } = api;
