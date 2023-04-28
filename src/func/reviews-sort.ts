import {TCommentsType} from '../services/book-service-types';

export const ReviewsSort = (reviews: TCommentsType[]) =>
    [...reviews].sort((a,b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
