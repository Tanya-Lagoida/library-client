import {TBooksGenresType, TBooksType} from '../services/book-service-types';

type TArrObj = {
    [key: string]: TBooksType[]
}
export const categoryAmountCount = (booksArray: TBooksType[], categoryArray: TBooksGenresType[]) => {
    const arrObj: TArrObj = {}

    categoryArray.forEach((category) => {
        const key: string = category.name;

        arrObj[key] = []

        booksArray.forEach((book) =>
            book.categories.forEach((categoryBook) =>
                categoryBook === category.name ? arrObj[key].push(book) : null) )

        return  arrObj[key].length
    })

    return arrObj
}
