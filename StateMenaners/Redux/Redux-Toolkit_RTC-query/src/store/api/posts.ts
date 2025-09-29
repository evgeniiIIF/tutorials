import { api } from './api';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      // note: an optional `queryFn` may be used in place of `query`
      query: () => ({ url: `/posts` }),
      // Pick out data and prevent nested properties in a hook or selector
      // transformResponse: (response: { data: Post }) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: () => [{ type: 'Post' }],
    }),
    // The query accepts a number and returns a Post
    getPost: build.query<Post, number>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => ({ url: `post/${id}` }),
      // Pick out data and prevent nested properties in a hook or selector
      // transformResponse: (response: { data: Post }) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    deletePost: build.mutation<void, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/posts/${id}`,
      }),
      invalidatesTags: ["Post"]
    }),
  }),
  // overrideExisting: true
});

export const { useGetPostsQuery, useGetPostQuery, useDeletePostMutation } = postsApi;
