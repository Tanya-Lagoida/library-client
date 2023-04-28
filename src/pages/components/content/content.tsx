import React from 'react';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError, FetchBaseQueryMeta,
    MutationDefinition
} from '@reduxjs/toolkit/query';

import {
    TBookingRequest, TBookingRequestEdit,
    TBookingResponse,
    TBooksGenresType,
    TBooksType
} from '../../../services/book-service-types';
import {BookCardList} from '../book-card-list/book-card-list';
import {BookCardTable} from '../book-card-table/book-card-table';

import {ContentStylesForDesktopListView, ContentStylesForDesktopTableView} from './styles';

type TProps = {
    isListView: boolean
    dataBooks: TBooksType[]
    dataCategories: TBooksGenresType[]
    isDefaultSort: boolean
    enteredText: string
    booking: MutationTrigger<MutationDefinition<TBookingRequest, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
    deleteBooking: MutationTrigger<MutationDefinition<number | undefined, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
    setIsAlertSuccessOpen: (value: boolean) => void
    setIsAlertErrorOpen: (value: boolean) => void
    setTextAlert: (value: string) => void
    editingBooking: MutationTrigger<MutationDefinition<TBookingRequestEdit, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
}
export const Content: React.FC<TProps> = ({
    isListView,
    dataBooks,
    dataCategories,
    isDefaultSort,
    enteredText,
    booking,
    setIsAlertSuccessOpen,
    setIsAlertErrorOpen,
    setTextAlert, editingBooking,
    deleteBooking
}) => {
    if (isListView) {
        return (
            <ContentStylesForDesktopListView data-test-id="content">
                <BookCardList
                    deleteBooking={deleteBooking}
                    editingBooking={editingBooking}
                    booking={booking}
                    dataBooks={dataBooks}
                    dataCategories={dataCategories}
                    isDefaultSort={isDefaultSort}
                    enteredText={enteredText}
                    setIsAlertSuccessOpen={setIsAlertSuccessOpen}
                    setIsAlertErrorOpen={setIsAlertErrorOpen}
                    setTextAlert={setTextAlert}
                />
            </ContentStylesForDesktopListView>
        );
    }

    return (
        <ContentStylesForDesktopTableView data-test-id="content">
            <BookCardTable
                deleteBooking={deleteBooking}
                booking={booking}
                editingBooking={editingBooking}
                dataBooks={dataBooks}
                dataCategories={dataCategories}
                isDefaultSort={isDefaultSort}
                enteredText={enteredText}
                setIsAlertSuccessOpen={setIsAlertSuccessOpen}
                setIsAlertErrorOpen={setIsAlertErrorOpen}
                setTextAlert={setTextAlert}
            />
        </ContentStylesForDesktopTableView>
    );
};
