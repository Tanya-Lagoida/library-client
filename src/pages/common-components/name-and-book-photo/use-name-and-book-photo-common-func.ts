import { useState } from 'react';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError, FetchBaseQueryMeta,
    MutationDefinition
} from '@reduxjs/toolkit/query';

import {
    TBookingRequest,
    TBookingRequestEdit,
    TBookingResponse
} from '../../../services/book-service-types';



export type TUseNameAndBookPhotoCommonFunc = {
    booking:  MutationTrigger<MutationDefinition<TBookingRequest, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
    deleteBooking: MutationTrigger<MutationDefinition<number | undefined, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
    setIsAlertSuccessOpen: (value: boolean) => void
    setIsAlertErrorOpen: (value: boolean) => void
    setTextAlert: (value: string) => void
    editingBooking: MutationTrigger<MutationDefinition<TBookingRequestEdit, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
}
export const useNameAndBookPhotoCommonFunc = ({booking, setIsAlertSuccessOpen, setIsAlertErrorOpen, setTextAlert, deleteBooking, editingBooking}: TUseNameAndBookPhotoCommonFunc) => {
    const [isModalOpenBooking, setIsModalOpenBooking] = useState<boolean>(false);

    const userData = localStorage.getItem('user');
    const userId = userData ? String(JSON.parse(userData).id) : '';

    const handleReserveBook = async (bookId: number | undefined, date: Date | null) => {
        const data = {
            data: {
                order: true,
                dateOrder: date,
                book: String(bookId),
                customer: userId,
            }
        };

        try {
            await booking(data).unwrap();
            setIsModalOpenBooking(false);
            // setIsAlertSuccessOpen(true);
            // setTextAlert('Книга забронирована. Подробности можно посмотреть на странице Профиль');
            // setTimeout(() => {
            //     setIsAlertSuccessOpen(false)
            // }, 4000);

        } catch (errorResponse) {
            setIsModalOpenBooking(false);
            // setIsAlertErrorOpen(true);
            // setTextAlert('Что-то пошло не так, книга не забронирована. Попробуйте позже!');
            // setTimeout(() => {
            //     setIsAlertErrorOpen(false)
            // }, 4000);
        }
    };

    const handleDeleteBook = async (bookingId: number | undefined, customerId: number | undefined) => {

        try {
            await deleteBooking(bookingId).unwrap();
            setIsModalOpenBooking(false);
            // setIsAlertSuccessOpen(true);
            // setTextAlert('Бронирование книги успешно отменено!');
            // setTimeout(() => {
            //     setIsAlertSuccessOpen(false)
            // }, 4000);

        } catch (errorResponse) {
            setIsModalOpenBooking(false);
            // setIsAlertErrorOpen(true);
            // setTextAlert('Не удалось отменить бронирование книги. Попробуйте позже!');
            // setTimeout(() => {
            //     setIsAlertErrorOpen(false)
            // }, 4000);
        }
    }

    const handleEditBook = async (bookingId: number | undefined, bookId: number | undefined, customerId: number | undefined, date: Date | null) => {
        const dataBody: TBookingRequestEdit = {
            data: {
                data: {
                    order: true,
                    dateOrder: date,
                    book: String(bookId),
                    customer: userId
                },
            },
            id: bookingId,
        };

        try {
            await editingBooking(dataBody).unwrap();
            setIsModalOpenBooking(false);
            // setIsAlertSuccessOpen(true);
            // setTextAlert('Бронирование новой даты успешно изменено. Подробности можно посмотреть на странице Профиль');
            // setTimeout(() => {
            //     setIsAlertSuccessOpen(false)
            // }, 4000);

        } catch (errorResponse) {
            setIsModalOpenBooking(false);
            // setIsAlertErrorOpen(true);
            // setTextAlert('Что-то пошло не так, дату бронирования не удалось изменить. Попробуйте позже!');
            // setTimeout(() => {
            //     setIsAlertErrorOpen(false)
            // }, 4000);
        }
    }

    return ({isModalOpenBooking, setIsModalOpenBooking, handleReserveBook, handleDeleteBook, handleEditBook})
}

