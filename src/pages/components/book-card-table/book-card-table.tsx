import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError, FetchBaseQueryMeta,
    MutationDefinition
} from '@reduxjs/toolkit/query';

import {EEndPoints} from '../../../config/endpoints';
import {BookFilterSort} from '../../../func/book-filter-sort';
import {dateFunc} from '../../../func/date-adding-zero-func';
import {ModalBooking} from '../../../modal-books/modal-booking';
import {
    TBookingRequest, TBookingRequestEdit,
    TBookingResponse,
    TBooksGenresType,
    TBooksType
} from '../../../services/book-service-types';
import {
    useNameAndBookPhotoCommonFunc
} from '../../common-components/name-and-book-photo/use-name-and-book-photo-common-func';
import {useStateForBook} from '../../common-components/name-and-book-photo/use-state-for-book';
import {StarComponent} from '../../common-components/stars/star-component';
import {useMediaQuery} from '../../hooks/use-media-query';
import withoutCover from '../../images/icon-without-cover.svg';
import {LabelText} from '../../labels/labels';
import {device} from '../../main/styles';
import {ImgContainerList} from '../book-card-list/styles';
import {ButtonComponent} from '../button/button-component';

import {
    BookAuthorBlock, BookAuthorBlockContainer,
    BookCoverContainer,
    BookNameBlock, BookNameBlockContainer, ButtonContainer,
    ContainerTableView, EnteredText,
    Name, NonCategory, StarLabel, StarsBoxBookCardTable,
} from './styles';

type TProps = {
    dataBooks: TBooksType[]
    dataCategories: TBooksGenresType[]
    isDefaultSort: boolean
    enteredText: string
    setIsAlertSuccessOpen: (value: boolean) => void
    setIsAlertErrorOpen: (value: boolean) => void
    setTextAlert: (value: string) => void
    booking:  MutationTrigger<MutationDefinition<TBookingRequest, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
    deleteBooking: MutationTrigger<MutationDefinition<number | undefined, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
    editingBooking: MutationTrigger<MutationDefinition<TBookingRequestEdit, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookList' | 'bookById', TBookingResponse, 'bookApi'>>
}
export const BookCardTable: React.FC<TProps> = ({
    dataBooks,
    dataCategories,
    isDefaultSort,
    enteredText,
    setIsAlertErrorOpen,
    setIsAlertSuccessOpen,
    setTextAlert,
    booking, editingBooking,
    deleteBooking
}) => {
    const navigate = useNavigate();
    const isMobileView = useMediaQuery(`${device.mobileS}`);
    const isLaptopView = useMediaQuery(`${device.laptopL}`);
    const regex = new RegExp(`(${enteredText})`, 'gmiu');
    const {category} = useParams();
    const {isModalOpenBooking, setIsModalOpenBooking, handleReserveBook, handleDeleteBook, handleEditBook} = useNameAndBookPhotoCommonFunc({
        setIsAlertSuccessOpen,
        setIsAlertErrorOpen,
        booking, setTextAlert, deleteBooking, editingBooking
    });

    const {handleOpenModalBooking, handleReserveBookModal, userId, customerIdState, handleDeleteBookModal, handleEditBookModal, dateState, selectedDay, setSelectedDay } = useStateForBook({
        handleReserveBook,
        handleDeleteBook,
        setIsModalOpenBooking, handleEditBook
    });

    const sortBook = BookFilterSort({dataBooks, dataCategories, isDefaultSort, enteredText});

    if (sortBook[2].length === 0 && category !== 'all') {

        return <NonCategory>
            {isMobileView
                ?
                <div>
                    <LabelText
                        data-test-id="empty-category"
                        variantText={isMobileView ? 'medium18LS' : 'large'}>В этой категории книг
                        ещё нет
                    </LabelText>
                </div>
                :
                <LabelText
                    data-test-id="empty-category"
                    variantText={isMobileView ? 'medium18LS' : 'large'}>В этой категории книг ещё
                    нет</LabelText>
            }
        </NonCategory>;
    }

    if (sortBook[0].length === 0 && sortBook[1].length === 0) {

        return <NonCategory>
            {isMobileView
                ?
                <div>
                    <LabelText
                        data-test-id="search-result-not-found"
                        variantText={isMobileView ? 'medium18LS' : 'large'}>По запросу ничего не
                        найдено
                    </LabelText>
                </div>
                :
                <LabelText
                    data-test-id="search-result-not-found"
                    variantText={isMobileView ? 'medium18LS' : 'large'}>По запросу ничего не
                    найдено</LabelText>
            }
        </NonCategory>;
    }

    return (
        <React.Fragment> {
            (category === 'all' ? sortBook[0] : sortBook[1])
                .map((book: TBooksType) =>
                    <ContainerTableView
                        key={book.id}
                        data-test-id="card"
                        onClick={() =>
                            navigate(`/books/${category}/${book.id}`)}>
                        <BookCoverContainer>
                            {
                                book.image ?
                                    <ImgContainerList
                                        image={book.image.url}
                                        src={`${EEndPoints.baseUrl}${book.image.url}`}
                                        alt=""
                                    />
                                    : <ImgContainerList
                                        src={withoutCover}
                                        alt=""
                                    />
                            }
                        </BookCoverContainer>
                        {book.rating === null ?
                            <StarLabel>
                                <LabelText
                                    variantText="medium14Norm">ещё нет оценок</LabelText>
                            </StarLabel>
                            :
                            <StarsBoxBookCardTable>
                                <StarComponent
                                    rating={book?.rating}
                                    width={isMobileView ? '34px' : '24px'}
                                    height={isMobileView ? '34px' : '24px'}
                                    alt=""/>
                            </StarsBoxBookCardTable>
                        }
                        <Name>
                            <BookNameBlockContainer>
                                <BookNameBlock>
                                    {
                                        book.title.split(regex).map((partOfTitle) => partOfTitle.toLowerCase() === enteredText.toLowerCase()
                                            ?
                                            <EnteredText>
                                                <LabelText
                                                    data-test-id="highlight-matches"
                                                    variantText={isMobileView || isLaptopView ? 'medium14Bold' : 'smallBold'}>
                                                    {partOfTitle}
                                                </LabelText>
                                            </EnteredText>
                                            :
                                            <LabelText
                                                variantText={isMobileView || isLaptopView ? 'medium14Bold' : 'smallBold'}>
                                                {partOfTitle}
                                            </LabelText>
                                        )
                                    }
                                </BookNameBlock>
                            </BookNameBlockContainer>
                            <BookAuthorBlockContainer>
                                <BookAuthorBlock>
                                    {
                                        book.authors.map((author) =>

                                            <LabelText
                                                variantText={isLaptopView ? 'medium14Norm' : 'small400'}
                                                key={author}>
                                                {author},&nbsp;
                                            </LabelText>
                                        )
                                    }
                                    <LabelText
                                        variantText={isLaptopView ? 'medium14Norm' : 'small400'}>
                                        {book.issueYear}
                                    </LabelText>
                                </BookAuthorBlock>
                            </BookAuthorBlockContainer>
                        </Name>
                        <ButtonContainer>
                            <ButtonComponent
                                data-test-id="booking-button"
                                onClick={(e) => {handleOpenModalBooking(e, book)}}
                                disabled={(book?.booking === null && book?.delivery === null) ? false : book?.delivery || book?.booking?.customerId !== userId ? true  : undefined}
                                status={book?.booking?.customerId === userId ? 'booking' :
                                    book?.booking === null && book?.delivery === null ? 'inStock'
                                        : book?.delivery !== null || book?.booking?.customerId !== userId ? 'delivery'
                                            : undefined}
                                width={isMobileView ? '256px' : '166px'}
                                height="40px"
                            >
                                <LabelText
                                    variantText="smallLS">
                                    {book?.delivery ? `Занята до ${dateFunc(book?.delivery?.dateHandedTo)}`
                                        : book?.booking ? 'Забронирована'
                                            : 'Забронировать'}
                                </LabelText>
                            </ButtonComponent>
                        </ButtonContainer>
                    </ContainerTableView>
                )
        }
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

    );
};
