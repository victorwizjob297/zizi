import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseurl } from './constant';

export const adReviewsApi = createApi({
  reducerPath: 'adReviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseurl}/api/ad-reviews`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['AdReview'],
  endpoints: (builder) => ({
    getAdReviews: builder.query({
      query: ({ adId, page = 1, limit = 10 }) =>
        `/ad/${adId}?page=${page}&limit=${limit}`,
      providesTags: (result, error, { adId }) => [
        { type: 'AdReview', id: `AD-${adId}` },
      ],
    }),
    getAdRating: builder.query({
      query: (adId) => `/ad/${adId}/rating`,
      providesTags: (result, error, adId) => [
        { type: 'AdReview', id: `RATING-${adId}` },
      ],
    }),
    getMyReview: builder.query({
      query: (adId) => `/ad/${adId}/my-review`,
      providesTags: (result, error, adId) => [
        { type: 'AdReview', id: `MY-${adId}` },
      ],
    }),
    getUserReviews: builder.query({
      query: ({ userId, page = 1, limit = 10 }) =>
        `/user/${userId}?page=${page}&limit=${limit}`,
      providesTags: (result, error, { userId }) => [
        { type: 'AdReview', id: `USER-${userId}` },
      ],
    }),
    getReview: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'AdReview', id }],
    }),
    createReview: builder.mutation({
      query: ({ adId, ...body }) => ({
        url: `/ad/${adId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { adId }) => [
        { type: 'AdReview', id: `AD-${adId}` },
        { type: 'AdReview', id: `RATING-${adId}` },
        { type: 'AdReview', id: `MY-${adId}` },
      ],
    }),
    updateReview: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'AdReview', id },
        { type: 'AdReview', id: 'LIST' },
      ],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'AdReview', id },
        { type: 'AdReview', id: 'LIST' },
      ],
    }),
    addReaction: builder.mutation({
      query: ({ id, type }) => ({
        url: `/${id}/react`,
        method: 'POST',
        body: { type },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'AdReview', id },
      ],
    }),
    removeReaction: builder.mutation({
      query: (id) => ({
        url: `/${id}/react`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'AdReview', id },
      ],
    }),
  }),
});

export const {
  useGetAdReviewsQuery,
  useGetAdRatingQuery,
  useGetMyReviewQuery,
  useGetUserReviewsQuery,
  useGetReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useAddReactionMutation,
  useRemoveReactionMutation,
} = adReviewsApi;
