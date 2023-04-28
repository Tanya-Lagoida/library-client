import React from 'react';

import {StarContainer} from './style';

export type TStarsProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    width?: string
    height?: string
    rating: number
}

export const StarComponent: React.FC<TStarsProps> = ({width = '24px', height = '24px', rating}) => (

    <StarContainer data-test-id="rating">
        {
            [...Array(5)].map((star, index) => (
                    <div data-test-id="star">
                        <svg
                            data-test-id={index + 1 <= rating && 'star-active'}
                            width={width} height={height}
                            viewBox="0 0 25 24"
                            fill={index + 1 <= rating ? '#FFBC1F' : 'none'}
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.098 8.30426L12.5 2.54946L14.902 8.30426C15.0419 8.63938 15.3576 8.86723 15.7187 8.89608L21.9493 9.39383L17.2036 13.4448C16.9276 13.6804 16.8064 14.0508 16.891 14.4042L18.3415 20.4636L13.0041 17.215C12.6945 17.0266 12.3055 17.0266 11.9959 17.215L6.65848 20.4636L8.10898 14.4042C8.19359 14.0508 8.07245 13.6804 7.79644 13.4448L3.05067 9.39383L9.28134 8.89608C9.64244 8.86723 9.9581 8.63938 10.098 8.30426Z"
                                stroke="#FFBC1F"/>
                        </svg>
                    </div>

                )
            )
        }
    </StarContainer>
);
