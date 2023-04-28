import React, {ChangeEvent, useEffect, useState} from 'react';

import {AlertBookIdError} from '../../alerts/alert-book-id-error';
import {AlertBookIdResponse} from '../../alerts/alert-book-id-response';
import {Error} from '../../error/error';
import {Loader} from '../../loader/loader';
import {
    useBookingMutation, useDeleteBookingMutation, useEditingBookingMutation,
    useGettingAListOfBookGenresQueryState,
    useGettingAListOfBooksQuery
} from '../../services/book-service';
import {Content} from '../components/content/content';
import {useSort} from '../components/layout/layout';
import {Navigation} from '../components/navigation/navigation';

import {BlockNavigationAndContent} from './styles';

export const MainPage = () => {
    const {
        data: dataBooks = [],
        isLoading: isLoadingBooks,
        isFetching: isFetchingBooks,
        isError: isErrorBooks
    } = useGettingAListOfBooksQuery();
    const {
        data: dataCategories = [],
        isLoading: isLoadingCategories,
        isFetching: isFetchingCategories,
        isError: isErrorCategories
    } = useGettingAListOfBookGenresQueryState();

    const [isListView, setIsListView] = useState<boolean>(false);
    const [enteredText, setEnteredText] = useState<string>('');
    const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState<boolean>(false);
    const [isAlertErrorOpen, setIsAlertErrorOpen] = useState<boolean>(false);
    const [textAlert, setTextAlert] = useState<string>('');
    const {isDefaultSort, updateSort} =  useSort();
    const [booking, {isLoading: isBookingLoading, data: bookingData, isSuccess: bookingIsSuccess, reset: bookingReset, isError: bookingIsError, error: bookingError}] = useBookingMutation();
    const [deleteBooking, {isLoading: isDeleteBookingLoading, data: deletingData, isSuccess: deletingIsSuccess, reset: deleteBookingReset, isError: deleteIsError, error: deleteError}] = useDeleteBookingMutation();
    const [editingBooking, {isLoading: isEditBookingLoading, data: editingData, isSuccess: editingIsSuccess, reset: editingBookingReset, isError: editingIsError, error: editingError}] = useEditingBookingMutation();

    const handleSortBooks = (): void => {

        updateSort( (previousValue) => !previousValue);
    }

    const handleIsListView = (value: boolean): void => setIsListView(value);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredText(event.target.value);
    };

    const isLoaderActive = isLoadingBooks || isLoadingCategories || isFetchingBooks || isFetchingCategories;

    useEffect(() => {
        if (bookingData && bookingIsSuccess && !isLoaderActive) {
            setIsAlertSuccessOpen(true);
            setTextAlert('Книга забронирована. Подробности можно посмотреть на странице Профиль');
            setTimeout(() => {
                setIsAlertSuccessOpen(false)
            }, 4000);
            bookingReset();
        }
        if (bookingIsError && bookingError && !isLoaderActive) {
            setIsAlertErrorOpen(true);
            setTextAlert('Что-то пошло не так, книга не забронирована. Попробуйте позже!');
            setTimeout(() => {
                setIsAlertErrorOpen(false)
            }, 4000);
            bookingReset();
        }
    },[bookingData, bookingError, bookingIsError, bookingIsSuccess, bookingReset, isLoaderActive]);

    useEffect(() => {
        if (deletingData && deletingIsSuccess && !isLoaderActive) {
            setIsAlertSuccessOpen(true);
            setTextAlert('Бронирование книги успешно отменено!');
            setTimeout(() => {
                setIsAlertSuccessOpen(false)
            }, 4000);
            deleteBookingReset();
        }
        if (deleteIsError && deleteError && !isLoaderActive) {
            setIsAlertErrorOpen(true);
            setTextAlert('Не удалось отменить бронирование книги. Попробуйте позже!');
            setTimeout(() => {
                setIsAlertErrorOpen(false)
            }, 4000);
            deleteBookingReset();
        }
    },[deleteBookingReset, deleteError, deleteIsError, deletingData, deletingIsSuccess, isLoaderActive]);

    useEffect(() => {
        if (editingData && editingIsSuccess && !isLoaderActive) {
            setIsAlertSuccessOpen(true);
            setTextAlert('Бронирование новой даты успешно изменено. Подробности можно посмотреть на странице Профиль');
            setTimeout(() => {
                setIsAlertSuccessOpen(false)
            }, 4000);
            editingBookingReset();
        }
        if (editingIsError && editingError && !isLoaderActive) {
            setIsAlertErrorOpen(true);
            setTextAlert('Что-то пошло не так, дату бронирования не удалось изменить. Попробуйте позже!');
            setTimeout(() => {
                setIsAlertErrorOpen(false)
            }, 4000);
            editingBookingReset();
        }
    },[editingBookingReset, editingData, editingError, editingIsError, editingIsSuccess, isLoaderActive]);

    if (isLoaderActive) {
        return <Loader/>;
    }

    return (
        <React.Fragment>
            {
                isErrorBooks || isErrorCategories ?
                    <Error/>
                    :
                    isAlertSuccessOpen ?
                        <AlertBookIdResponse
                            text={textAlert}
                            setIsAlertSuccessOpen={setIsAlertSuccessOpen}
                        />
                        :
                        isAlertErrorOpen ?
                            <AlertBookIdError
                                text={textAlert}
                                setIsAlertErrorOpen={setIsAlertErrorOpen}
                            />
                            : null
            }
            {isBookingLoading || isDeleteBookingLoading || isEditBookingLoading ? <Loader/> : null}

            { (dataBooks && dataCategories) &&
                <BlockNavigationAndContent>
                    <Navigation
                        handleIsListView={handleIsListView}
                        isListView={isListView}
                        handleSortBooks={handleSortBooks}
                        handleInputChange={handleInputChange}
                    />
                    <Content
                        editingBooking={editingBooking}
                        booking={booking}
                        deleteBooking={deleteBooking}
                        setIsAlertSuccessOpen={setIsAlertSuccessOpen}
                        setIsAlertErrorOpen={setIsAlertErrorOpen}
                        isListView={isListView}
                        dataBooks={dataBooks}
                        dataCategories={dataCategories}
                        isDefaultSort={isDefaultSort}
                        enteredText={enteredText}
                        setTextAlert={setTextAlert}
                    />
                </BlockNavigationAndContent>
            }
        </React.Fragment>
    );
};
