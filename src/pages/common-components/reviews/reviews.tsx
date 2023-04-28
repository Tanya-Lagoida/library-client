import React, {ChangeEvent, useState} from 'react';
import {useParams} from 'react-router-dom';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError, FetchBaseQueryMeta,
    MutationDefinition
} from '@reduxjs/toolkit/query';

import {EEndPoints} from '../../../config/endpoints';
import {dateFuncReviews} from '../../../func/date-func-rewiews';
import {ReviewsSort} from '../../../func/reviews-sort';
import {ModalRateBook} from '../../../modal-books/modal-rate-book';
import {TextArea, YourMarkBlock} from '../../../modal-books/styles';
import {TBooksByIdType,
    TCreateCommentTypesRequest,
    TCreateCommentTypesResponse
} from '../../../services/book-service-types';
import {ButtonComponent} from '../../components/button/button-component';
import {useMediaQuery} from '../../hooks/use-media-query';
import withoutCover from '../../images/icon-without-cover.svg';
import hideReviews from '../../images/stroke-black.svg';
import {LabelText} from '../../labels/labels';
import {device} from '../../main/styles';
import {StarComponent} from '../stars/star-component';
import {StarComponentUserReview} from '../stars/star-component-user-review';

import {
    ButtonReviewsContainer, CommonContainerReviews, HideReviewsImg,
    ReviewsAmount, ReviewsBlock, ReviewsBlockContainer,
    ReviewsBlockInformation,
    ReviewsContainer, ReviewsText, RightBlockUserName, StarsBox, UserNameAndData,
    UserPhoto,
} from './styles';

type TProps = {
    setIsAlertErrorOpen: (value: boolean) => void
    setIsAlertSuccessOpen: (value: boolean) => void
    book?: TBooksByIdType
    setTextAlert: (value: string) => void
    createComment: MutationTrigger<MutationDefinition<TCreateCommentTypesRequest, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, 'bookById', TCreateCommentTypesResponse, 'bookApi'>>
}
export const Reviews: React.FC<TProps> = ({book, createComment, setIsAlertSuccessOpen, setIsAlertErrorOpen, setTextAlert}) => {
    const isMobileView = useMediaQuery(`${device.mobileS}`);
    const isTabletView = useMediaQuery(`${device.tablet}`);
    const isLaptopView = useMediaQuery(`${device.laptopL}`);

    const [isReviewsOpen, setReviewsOpen] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [textAreaState, setTextAreaState] = useState<string>('');
    const {bookId} = useParams();
    const userData = localStorage.getItem('user');

    const userId = userData ? String(JSON.parse(userData).id) : '';

    const handleHideReviews = () => {
        setReviewsOpen((previousValue) => !previousValue);
    };
    const handleOpenModalRateBook = () => {
        setIsModalOpen(true);
    };
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const handleChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaState(event.currentTarget.value);
    };
    const handleSendComment = async () => {
        const data = {
            data: {
                rating,
                text: textAreaState,
                book: bookId,
                user: userId,
            }
        };

        try {
            await createComment(data).unwrap();
            setIsModalOpen(false);
            // setIsAlertSuccessOpen(true);
            // setTextAlert('Спасибо, что нашли время оценить книгу!');
            // setTimeout(() => {
            //     setIsAlertSuccessOpen(false)
            // }, 4000);

        } catch (errorResponse) {
            setIsModalOpen(false);
            // setIsAlertErrorOpen(true);
            // setTextAlert('Оценка не была отправлена. Попробуйте позже!');
            // setTimeout(() => {
            //     setIsAlertErrorOpen(false)
            // }, 4000);
        }
    };

    const disabledButton = () => {
        const commonIdComment = book?.comments?.find((comment) => comment.user.commentUserId === Number(userId));

        if (commonIdComment) {
            return true;
        }

        return false;
    };
    const buttonStatus = disabledButton();
    const sortReviews = ReviewsSort(book?.comments ?? []);

    return (
        <ReviewsContainer>
            <CommonContainerReviews
                comments={book?.comments}
                isReviewsOpen={isReviewsOpen}>
                <LabelText variantText="medium18">Отзывы</LabelText>
                <ReviewsAmount>
                    <LabelText variantText="medium14">{book?.comments?.length}</LabelText>
                </ReviewsAmount>
                <HideReviewsImg
                    comments={book?.comments}
                    isReviewsOpen={isReviewsOpen}
                    src={hideReviews} alt=""
                    onClick={handleHideReviews}
                    data-test-id="button-hide-reviews"/>
            </CommonContainerReviews>
            <div data-test-id='reviews'>
                <ReviewsBlockContainer
                    isReviewsOpen={isReviewsOpen}
                    data-test-id='comment-wrapper'
                >
                    {sortReviews?.map((comment) =>
                        <ReviewsBlock key={comment.id}>
                            <ReviewsBlockInformation>
                                {
                                    comment.user.avatarUrl ?
                                        <UserPhoto
                                            src={`${EEndPoints.baseUrl}${comment.user.avatarUrl}`}
                                            alt=""/>
                                        : <UserPhoto src={withoutCover} alt=""/>
                                }
                                <RightBlockUserName>
                                    <UserNameAndData>
                                        <LabelText
                                            data-test-id='comment-author'
                                            variantText={isMobileView ? 'medium15' : 'medium16LH24'}
                                        >{comment.user.firstName} {comment.user.lastName}
                                        </LabelText>
                                    </UserNameAndData>
                                    <UserNameAndData>
                                        <LabelText
                                            data-test-id='comment-date'
                                            variantText={isMobileView ? 'medium15' : 'medium16LH24'}
                                        >{dateFuncReviews(comment.createdAt)}
                                        </LabelText>
                                    </UserNameAndData>
                                </RightBlockUserName>
                            </ReviewsBlockInformation>
                            <StarsBox>
                                {
                                    comment.rating ?
                                        <StarComponent
                                            rating={comment?.rating}
                                            width={isMobileView ? '34px' : '24px'}
                                            height={isMobileView ? '34px' : '24px'}
                                            alt=""/> : null
                                }

                            </StarsBox>
                            <ReviewsText text={comment.text}>
                                <LabelText
                                    data-test-id='comment-text'
                                    variantText={isMobileView ? 'medium15' : 'medium16LH24'}
                                >
                                    {comment.text}
                                </LabelText>
                            </ReviewsText>
                        </ReviewsBlock>
                    )}
                </ReviewsBlockContainer>
                <ButtonReviewsContainer>
                    <ButtonComponent
                        data-test-id='button-rate-book'
                        disabled={buttonStatus}
                        isDisabled={buttonStatus}
                        onClick={handleOpenModalRateBook}
                        status="inStock"
                        width={isLaptopView ? '350px' : isTabletView ? '640px' : '288px'}
                        height={isMobileView ? '40px' : '52px'}
                    >
                        <LabelText
                            variantText={isMobileView ? 'small500LS' : 'medium16LS'}
                            data-test-id="button-rating"
                        >
                            оценить книгу
                        </LabelText>
                    </ButtonComponent>
                </ButtonReviewsContainer>
            </div>
            <ModalRateBook
                dataTestId='modal-rate-book'
                typeModal='reviews'
                isVisible={isModalOpen}
                title="Оцените книгу"
                content={
                    <React.Fragment>
                        <YourMarkBlock>
                            <LabelText
                                variantText="medium16Bold"
                            >
                                Ваша оценка
                            </LabelText>
                            <StarsBox>
                                <StarComponentUserReview
                                    rating={rating}
                                    setRating={setRating}
                                    hover={hover}
                                    setHover={setHover}
                                    width={isMobileView ? '32px' : '42px'}
                                    height={isMobileView ? '32px' : '42px'}
                                />
                            </StarsBox>
                        </YourMarkBlock>
                        <TextArea
                            data-test-id='comment'
                            onChange={handleChangeTextArea}
                            placeholder="Оставить отзыв"
                        />
                    </React.Fragment>

                }
                footer={
                    <ButtonComponent
                        data-test-id='button-comment'
                        onClick={handleSendComment}
                        status="inStock"
                        width={isMobileView ? '256px' : '416px'}
                        height={isMobileView ? '40px' : '52px'}
                    >
                        <LabelText
                            variantText={isMobileView ? 'small500LS' : 'medium16LS'}
                        >
                            оценить
                        </LabelText>
                    </ButtonComponent>
                }
                onClose={() => setIsModalOpen(false)}
            />
        </ReviewsContainer>
    );
};
