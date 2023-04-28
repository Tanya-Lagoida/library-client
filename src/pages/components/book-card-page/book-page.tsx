import React from 'react';

import { Breadcrumbs } from '../../common-components/breadcrumbs/breadcrumbs';

import { BookCardPage } from './book-card-page';
import { BookCardPageContainerStyles } from './common-styles';

export const BookPage = () => (

    <BookCardPageContainerStyles>
        <Breadcrumbs/>
        <BookCardPage/>
    </BookCardPageContainerStyles>
);

