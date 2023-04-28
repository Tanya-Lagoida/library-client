import React from 'react';
import dayjs from 'dayjs';

import {Calendar} from '../calendar/calendar';
import {ButtonComponent} from '../pages/components/button/button-component';
import {useMediaQuery} from '../pages/hooks/use-media-query';
import {LabelText} from '../pages/labels/labels';
import {device} from '../pages/main/styles';

import {ModalRateBook} from './modal-rate-book';
import {EditButtonContainer} from './styles';

type TPropsType = {
    isModalOpenBooking: boolean
    setIsModalOpenBooking: (value: boolean) => void
    handleReserveBook: React.MouseEventHandler<HTMLButtonElement> | undefined
    handleDeleteBook: any
    customerIdState: number | undefined
    dateState: any
    selectedDay: Date | null;
    setSelectedDay: (value: Date | null) => void;
    handleEditBook: any
}

export const ModalBooking: React.FC<TPropsType> = ({
    setIsModalOpenBooking,
    isModalOpenBooking,
    handleReserveBook,
    handleDeleteBook,
    customerIdState, dateState, setSelectedDay, selectedDay, handleEditBook
}) => {
    const isMobileView = useMediaQuery(`${device.mobileS}`);

    const userData = localStorage.getItem('user');
    const userId = userData ? JSON.parse(userData).id : '';

    return (
        <ModalRateBook
            dataTestId='booking-modal'
            typeModal={dateState ? 'editBooking' : 'booking'}
            isVisible={isModalOpenBooking}
            title={dateState ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}
            content={
                <Calendar
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    dateState={dateState}
                />

            }
            footer={
                <EditButtonContainer>

                    {dateState && (customerIdState === userId) ?
                        <React.Fragment>
                            <ButtonComponent
                                disabled={dayjs(dateState).isSame(dayjs(selectedDay), 'day')}
                                isDisabled={dayjs(dateState).isSame(dayjs(selectedDay), 'day')}
                                data-test-id='booking-button'
                                onClick={handleEditBook}
                                status="inStock"
                                width={isMobileView ? '256px' : '416px'}
                                height={isMobileView ? '40px' : '52px'}
                            >
                                <LabelText
                                    variantText={isMobileView ? 'small500LS' : 'medium16LS'}
                                >
                                    забронировать
                                </LabelText>
                            </ButtonComponent>
                            <ButtonComponent
                                data-test-id="booking-cancel-button"
                                onClick={handleDeleteBook}
                                status="booking"
                                width={isMobileView ? '256px' : '416px'}
                                height={isMobileView ? '40px' : '52px'}
                            >
                                <LabelText
                                    variantText={isMobileView ? 'small500LS' : 'medium16LS'}
                                >
                                    отменить бронь
                                </LabelText>
                            </ButtonComponent>
                        </React.Fragment>
                        :
                        <ButtonComponent
                            disabled={!selectedDay}
                            isDisabled={!selectedDay}
                            data-test-id='booking-button'
                            onClick={handleReserveBook}
                            status="inStock"
                            width={isMobileView ? '256px' : '416px'}
                            height={isMobileView ? '40px' : '52px'}
                        >
                            <LabelText
                                variantText={isMobileView ? 'small500LS' : 'medium16LS'}
                            >
                                забронировать
                            </LabelText>
                        </ButtonComponent>
                    }
                </EditButtonContainer>

            }
            onClose={() => {
                setSelectedDay(null)
                setIsModalOpenBooking(false)
            }}
        />
    );
};
