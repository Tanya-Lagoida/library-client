import React from 'react';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError, FetchBaseQueryMeta,
    MutationDefinition
} from '@reduxjs/toolkit/query';

import {    TBookingRequest, TBookingRequestEdit,
    TBookingResponse,
TBooksByIdType} from '../../../services/book-service-types';
import {useMediaQuery} from '../../hooks/use-media-query';
import {device} from '../../main/styles';

import {NameBookPhotoAndAboutBookLaptop} from './name-and-book-photo-laptop';
import {NameBookPhotoAndAboutBookMobile} from './name-and-book-photo-mobile';
import {NameBookPhotoAndAboutBookTablet} from './name-and-book-photo-tablet';

type TProps = {
    book?: TBooksByIdType
    setIsAlertSuccessOpen: (value: boolean) => void
    setTextAlert: (value: string) => void
    setIsAlertErrorOpen: (value: boolean) => void
    booking:  MutationTrigger<MutationDefinition<TBookingRequest, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
    deleteBooking: MutationTrigger<MutationDefinition<number | undefined, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
    editingBooking: MutationTrigger<MutationDefinition<TBookingRequestEdit, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
}

export const NameBookPhotoAndAboutBook: React.FC<TProps> = ({book, setIsAlertSuccessOpen, setIsAlertErrorOpen, booking, setTextAlert, deleteBooking, editingBooking}) => {
    const isTabletView = useMediaQuery(`${device.tablet}`);
    const isLaptopLView = useMediaQuery(`${device.laptopL}`);

    if (isLaptopLView) return <NameBookPhotoAndAboutBookLaptop
        editingBooking={editingBooking}
        booking={booking}
        deleteBooking={deleteBooking}
        setIsAlertSuccessOpen={setIsAlertSuccessOpen}
        setIsAlertErrorOpen={setIsAlertErrorOpen}
        setTextAlert={setTextAlert}
        book={book}
    />;
    if (isTabletView) return <NameBookPhotoAndAboutBookTablet
        editingBooking={editingBooking}
        booking={booking}
        deleteBooking={deleteBooking}
        setIsAlertSuccessOpen={setIsAlertSuccessOpen}
        setIsAlertErrorOpen={setIsAlertErrorOpen}
        setTextAlert={setTextAlert}
        book={book}
    />;

    return <NameBookPhotoAndAboutBookMobile
        editingBooking={editingBooking}
        booking={booking}
        deleteBooking={deleteBooking}
        setIsAlertSuccessOpen={setIsAlertSuccessOpen}
        setIsAlertErrorOpen={setIsAlertErrorOpen}
        setTextAlert={setTextAlert}
        book={book}
    />;
};
