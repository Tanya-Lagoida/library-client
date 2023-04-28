import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {EEndPoints} from '../config/endpoints';

import {
    TBookingRequest, TBookingRequestEdit,
    TBookingResponse,
    TBooksByIdType,
    TBooksGenresType,
    TBooksType, TCreateCommentTypesRequest,
    TCreateCommentTypesResponse
} from './book-service-types';




export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: EEndPoints.baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('authorization', `Bearer ${JSON.parse(token)}`)
            }

            return headers
        }
    }),
    keepUnusedDataFor: 0,
    tagTypes: ['bookList', 'bookById'],
    endpoints: (builder) => ({
        gettingAListOfBooks: builder.query<TBooksType[], void>({
            query: () => EEndPoints.gettingAListOfBooks,
            providesTags: () => ['bookList'],
        }),
        gettingABookById: builder.query<TBooksByIdType, number>({
            query: (id) => `${EEndPoints.gettingABookById}/${id}`,
            providesTags: () => ['bookById'],
        }),
        gettingAListOfBookGenres: builder.query<TBooksGenresType[], void>({
            query: () => EEndPoints.gettingAListOfBookGenres,
        }),
        createComment: builder.mutation<TCreateCommentTypesResponse, TCreateCommentTypesRequest>({
            query: (body) => ({
                url: EEndPoints.createComment,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['bookById'],
        }),
        booking: builder.mutation<TBookingResponse, TBookingRequest>({
            query: (body) => ({
                url: EEndPoints.booking,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['bookList', 'bookById'],
        }),
        editingBooking: builder.mutation< TBookingResponse, TBookingRequestEdit >({
            query: (body) => ({
                url: `${EEndPoints.editingBooking}/${body.id}`,
                method: 'PUT',
                body: body.data,
            }),
            invalidatesTags: ['bookList', 'bookById'],
        }),
        deleteBooking: builder.mutation<TBookingResponse, number | undefined>({
            query: (id) => ({
                url: `${EEndPoints.deleteBooking}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['bookList', 'bookById'],
        }),
    }),
})

export const {
    useGettingAListOfBooksQuery,
    useGettingABookByIdQuery,
    useGettingAListOfBookGenresQuery,
    useCreateCommentMutation,
    useBookingMutation,
    useEditingBookingMutation,
    useDeleteBookingMutation
} = bookApi;

export const useGettingAListOfBookGenresQueryState = bookApi.endpoints.gettingAListOfBookGenres.useQueryState;
export const useGettingAListOfBooksQueryState = bookApi.endpoints.gettingAListOfBooks.useQueryState;
export const useGettingAListOfBooksByIdQueryState = bookApi.endpoints.gettingABookById.useQueryState;
