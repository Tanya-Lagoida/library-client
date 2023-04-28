import {useState} from 'react';

import {TBooksByIdType} from '../../../services/book-service-types';

type TProps = {
    handleReserveBook:  (bookId: number | undefined, date: Date | null) => Promise<void>
    setIsModalOpenBooking:  (value: boolean) => void
    handleDeleteBook: (bookingId: number | undefined, customerId: number | undefined) => Promise<void>
    handleEditBook: (bookingId: number | undefined, bookId: number | undefined, customerId: number | undefined, date: Date | null) =>  Promise<void>
}

export const useStateForBookPage = ({
    handleReserveBook, setIsModalOpenBooking,
    handleDeleteBook, handleEditBook
}: TProps) => {
    const [bookIdState, setBookIdState] = useState<number>();
    const [dateState, setDateState] = useState<Date | undefined>(undefined);
    const [bookingIdState, setBookingIdState] = useState<number>();
    const [customerIdState, setCustomerIdState] = useState<number>();
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const handleOpenModalBooking = (bookFromMap: TBooksByIdType | undefined) => {
        setIsModalOpenBooking(true);
        setBookIdState(bookFromMap?.id);
        setDateState(bookFromMap?.booking?.dateOrder);
        setSelectedDay(bookFromMap?.booking?.dateOrder ? new Date(bookFromMap?.booking?.dateOrder) : null);
        setBookingIdState(bookFromMap?.booking?.id);
        setCustomerIdState(bookFromMap?.booking?.customerId);
    };
    const handleReserveBookModal = async () => {
        await handleReserveBook(bookIdState, selectedDay);
    };
    const handleDeleteBookModal = async () => {
        await handleDeleteBook(bookingIdState, customerIdState);
    };
    const handleEditBookModal = async () => {
        await handleEditBook(bookingIdState, bookIdState, customerIdState, selectedDay)
    }

    const userData = localStorage.getItem('user');
    const userId = userData ? JSON.parse(userData).id : '';

    return {handleOpenModalBooking, handleReserveBookModal, handleDeleteBookModal, handleEditBookModal, userId, customerIdState, dateState, selectedDay, setSelectedDay};
};
