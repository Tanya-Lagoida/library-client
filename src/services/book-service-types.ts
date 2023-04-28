export type TBooksType = {
    issueYear: string
    rating: number
    title: string
    authors: string[]
    image: { url: string } | null
    categories: string[]
    id: number
    booking: {
        id: number | undefined
        order: boolean
        dateOrder: Date
        customerId: number
        customerFirstName: string
        customerLastName: string
    },
    delivery: {
        id: number
        handed: boolean
        dateHandedFrom: Date
        dateHandedTo: Date
        recipientId: number
        recipientFirstName: string
        recipientLastName: string
    },
    histories: [
        {
            id: number
            userId: number
        }
    ]
}
export type TCommentsType = {
    id: number
    rating: number
    text: string
    createdAt: Date
    user: {
        commentUserId: number
        firstName: string
        lastName: string
        avatarUrl: string
    }
}
export type TBooksByIdType = {
    id: number
    title: string
    rating: number
    issueYear: string
    description: string
    publish: string
    pages: string
    cover: string
    weight: string
    format: string
    ISBN: string
    producer: string
    authors: string[]
    images: Array<{url: string}> | null
    categories: string[]
    comments: TCommentsType[] | null
    booking: {
        id: number | undefined
        order: boolean
        dateOrder: Date
        customerId: number
        customerFirstName: string
        customerLastName: string
    },
    delivery: {
        id: number
        handed: boolean
        dateHandedFrom: Date
        dateHandedTo: Date
        recipientId: number
        recipientFirstName: string
        recipientLastName: string
    },
    histories: [
        {
            id: number
            userId: number
        }
    ]
}

export type TBooksGenresType = {
    name: string
    path: string
    id: number
}
export type TCreateCommentTypesResponse = {
    data: {
        id: number
        attributes: {
            rating: number
            text: string
            createdAt: Date
            updatedAt: Date
            publishedAt: Date
        }
    }
}
export type TCreateCommentTypesRequest = {
    data: {
        rating: number | undefined
        text: string
        book: string | undefined
        user: string | undefined
    }
}

export type TBookingRequestData = {
    order: boolean
    dateOrder: Date | null
    book: string | undefined
    customer: string
};

export type TBookingRequestEdit = {
    data: TBookingRequest;
    id: number | undefined;
};

export type TBookingRequest = {
    data: TBookingRequestData;
}
export type TBookingResponse = {
    data: {
        id: number
        attributes: {
            order: boolean
            createdAt: Date
            updatedAt: Date
            publishedAt: Date
            dateOrder: Date
        }
    }
}

