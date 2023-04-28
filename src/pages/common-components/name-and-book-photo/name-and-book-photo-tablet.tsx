import React from 'react';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError, FetchBaseQueryMeta,
    MutationDefinition
} from '@reduxjs/toolkit/query';

import {dateFunc} from '../../../func/date-adding-zero-func';
import {ModalBooking} from '../../../modal-books/modal-booking';
import {
    TBookingRequest, TBookingRequestEdit,
    TBookingResponse,
    TBooksByIdType
} from '../../../services/book-service-types';
import {ButtonComponent} from '../../components/button/button-component';
import {ImgContainerForSwiper} from '../../components/swiper/styles';
import {SwiperTabletAndMobile} from '../../components/swiper/swiper-for-tablet-and-mobile';
import withoutCover from '../../images/icon-without-cover.svg';
import {LabelText} from '../../labels/labels';
import {AboutBook} from '../about-book/about-book';

import {
    ButtonBookContainer,
} from './laptop-styles';
import {
    AuthorNameTablet,
    BookNameTable, ContainerTabletBook,
    ContainerTabletStyles,
    PhotoBoxTablet,
    RightContainerBookTablet,
} from './tablet-styles';
import {useNameAndBookPhotoCommonFunc} from './use-name-and-book-photo-common-func';
import {useStateForBookPage} from './use-state-for-book-page';

type TProps = {
    book?: TBooksByIdType
    setIsAlertSuccessOpen: (value: boolean) => void
    setIsAlertErrorOpen: (value: boolean) => void
    setTextAlert: (value: string) => void
    booking:  MutationTrigger<MutationDefinition<TBookingRequest, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, never, TBookingResponse, 'bookApi'>>
    deleteBooking: MutationTrigger<MutationDefinition<number | undefined, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, never, TBookingResponse, 'bookApi'>>
    editingBooking: MutationTrigger<MutationDefinition<TBookingRequestEdit, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, never, TBookingResponse, 'bookApi'>>
}
export const NameBookPhotoAndAboutBookTablet: React.FC<TProps> = ({book, setIsAlertSuccessOpen,
    setIsAlertErrorOpen, booking, setTextAlert, deleteBooking, editingBooking}) => {

    const {isModalOpenBooking, setIsModalOpenBooking, handleReserveBook, handleDeleteBook, handleEditBook} = useNameAndBookPhotoCommonFunc({
        booking, setTextAlert,
        setIsAlertSuccessOpen,
        setIsAlertErrorOpen, deleteBooking, editingBooking
    });

    const {handleOpenModalBooking, handleReserveBookModal, userId, customerIdState, handleDeleteBookModal, handleEditBookModal, dateState, selectedDay, setSelectedDay } = useStateForBookPage({
        handleReserveBook,
        handleDeleteBook,
        setIsModalOpenBooking,
        handleEditBook
    });

    return (
        <React.Fragment>
            <ContainerTabletBook>
                <ContainerTabletStyles>
                    <PhotoBoxTablet images={book?.images}>
                        {
                            book?.images ? <SwiperTabletAndMobile book={book}/>
                                : <ImgContainerForSwiper>
                                    <img src={withoutCover} alt=""/>
                                </ImgContainerForSwiper>
                        }
                    </PhotoBoxTablet>
                    <RightContainerBookTablet>
                        <BookNameTable>
                            <LabelText
                                data-test-id="book-title"
                                variantText="large24">{book?.title}</LabelText>
                        </BookNameTable>
                        <AuthorNameTablet>
                            {
                                book?.authors.map((author) =>
                                    <LabelText variantText="medium14Bold" key={author}>
                                        {author}
                                    </LabelText>)
                            }
                        </AuthorNameTablet>
                        <ButtonBookContainer>
                            <ButtonComponent
                                data-test-id="booking-button"
                                onClick={() => handleOpenModalBooking(book)}
                                disabled={(book?.booking === null && book?.delivery === null) ? false : book?.delivery || book?.booking?.customerId !== userId ? true  : undefined}
                                status={book?.booking?.customerId === userId ? 'booking' :
                                    book?.booking === null && book?.delivery === null ? 'inStock'
                                        : book?.delivery !== null || book?.booking?.customerId !== userId ? 'delivery'
                                            : undefined}
                                width="306px"
                                height="52px">
                                <LabelText variantText="medium16LS">
                                    {book?.delivery ? `Занята до ${dateFunc(book?.delivery?.dateHandedTo)}`
                                        : book?.booking ? 'Забронирована'
                                            : 'Забронировать'}
                                </LabelText>
                            </ButtonComponent>
                        </ButtonBookContainer>
                    </RightContainerBookTablet>
                </ContainerTabletStyles>
                <AboutBook book={book}/>
            </ContainerTabletBook>
            <ModalBooking
                isModalOpenBooking={isModalOpenBooking}
                setIsModalOpenBooking={setIsModalOpenBooking}
                handleReserveBook={handleReserveBookModal}
                handleDeleteBook={handleDeleteBookModal}
                customerIdState={customerIdState}
                dateState={dateState}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                handleEditBook={handleEditBookModal}
            />
        </React.Fragment>
    )
}
