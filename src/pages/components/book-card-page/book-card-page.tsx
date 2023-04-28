import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {skipToken} from '@reduxjs/toolkit/query';

import {AlertBookIdError} from '../../../alerts/alert-book-id-error';
import {AlertBookIdResponse} from '../../../alerts/alert-book-id-response';
import {Error} from '../../../error/error';
import {Loader} from '../../../loader/loader';
import {
    useBookingMutation,
    useCreateCommentMutation, useDeleteBookingMutation, useEditingBookingMutation,
    useGettingABookByIdQuery
} from '../../../services/book-service';
import {
    DetailedInformation
} from '../../common-components/detailed-information/detailed-information';
import {
    NameBookPhotoAndAboutBook
} from '../../common-components/name-and-book-photo/name-and-book-photo';
import {Rating} from '../../common-components/rating/rating';
import {Reviews} from '../../common-components/reviews/reviews';

export const BookCardPage = () => {

    const {bookId} = useParams();
    const id = bookId === undefined ? bookId : +bookId;
    const [isAlertErrorOpen, setIsAlertErrorOpen] = useState<boolean>(false);
    const [isAlertSuccessOpen, setIsAlertSuccessOpen] = useState<boolean>(false);
    const [textAlert, setTextAlert] = useState<string>('');
    const {data: book, isLoading, isFetching, isError} = useGettingABookByIdQuery(id ?? skipToken);
    const [createComment, {isLoading: isCommentLoading, data: commentData, isSuccess: isCommentSuccess, reset: commentReset, isError: commentIsError, error: commentError}] = useCreateCommentMutation();
    const [booking, {isLoading: isBookingLoading, data: bookingData, isSuccess: bookingIsSuccess, reset: bookingReset, isError: bookingIsError, error: bookingError}] = useBookingMutation();
    const [deleteBooking, {isLoading: isDeleteBookingLoading, data: deletingData, isSuccess: deletingIsSuccess, reset: deleteBookingReset, isError: deleteIsError, error: deleteError}] = useDeleteBookingMutation();
    const [editingBooking, {isLoading: isEditBookingLoading, data: editingData, isSuccess: editingIsSuccess, reset: editingBookingReset, isError: editingIsError, error: editingError}] = useEditingBookingMutation();

    const isLoaderActive = isLoading || isFetching;

    useEffect(() => {
        if (commentData && isCommentSuccess && !isLoaderActive) {
            setIsAlertSuccessOpen(true);
            setTextAlert('Спасибо, что нашли время оценить книгу!');
            setTimeout(() => {
                setIsAlertSuccessOpen(false)
            }, 4000);
            commentReset();
        }
        if (commentIsError && commentError && !isLoaderActive) {
            setIsAlertErrorOpen(true);
            setTextAlert('Оценка не была отправлена. Попробуйте позже!');
            setTimeout(() => {
                setIsAlertErrorOpen(false)
            }, 4000);
            commentReset();
        }
    },[commentData, commentError, commentIsError, commentReset, isCommentSuccess, isLoaderActive]);

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
    if (isError) {
        return <Error/>;
    }

    return (
        <React.Fragment>
            {
                isAlertErrorOpen ?
                    <AlertBookIdError
                        text={textAlert}
                        setIsAlertErrorOpen={setIsAlertErrorOpen}
                    />
                    :
                    isAlertSuccessOpen ? <AlertBookIdResponse
                            text={textAlert}
                            setIsAlertSuccessOpen={setIsAlertSuccessOpen}
                        />
                        : null
            }
            {isCommentLoading || isBookingLoading || isDeleteBookingLoading || isEditBookingLoading ? <Loader/> : null}
            <NameBookPhotoAndAboutBook
                deleteBooking={deleteBooking}
                editingBooking={editingBooking}
                booking={booking}
                setIsAlertSuccessOpen={setIsAlertSuccessOpen}
                setIsAlertErrorOpen={setIsAlertErrorOpen}
                setTextAlert={setTextAlert}
                book={book}
            />
            <Rating book={book}/>
            <DetailedInformation book={book}/>
            <Reviews
                setIsAlertErrorOpen={setIsAlertErrorOpen}
                setIsAlertSuccessOpen={setIsAlertSuccessOpen}
                book={book}
                createComment={createComment}
                setTextAlert={setTextAlert}
            />
        </React.Fragment>
    );
};

