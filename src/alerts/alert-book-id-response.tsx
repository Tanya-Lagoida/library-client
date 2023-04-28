import React from 'react';

import {ErrorIconAndText, SuccessContainer} from '../error/styles';
import {useMediaQuery} from '../pages/hooks/use-media-query';
import closeError from '../pages/images/close-error.svg';
import goodResponse from '../pages/images/good response.svg';
import {LabelText} from '../pages/labels/labels';
import {device} from '../pages/main/styles';

type TPropsType = {
    setIsAlertSuccessOpen: (value: boolean) => void
    text: string
}

export const AlertBookIdResponse: React.FC<TPropsType> = ({setIsAlertSuccessOpen, text}) => {
    const isLaptopView = useMediaQuery(`${device.laptopL}`);
    const handleCloseAlert = () => {
        setIsAlertSuccessOpen(false)
    }

    return (
        <SuccessContainer data-test-id='error'>
            <ErrorIconAndText>
                <img src={goodResponse} alt=""/>
                <LabelText
                    variantText={isLaptopView ? 'medium16Bold' : 'medium14Bold'}
                >
                    {text}
                </LabelText>
            </ErrorIconAndText>
            <button
                onClick={handleCloseAlert}
                type="button"
            >
                <img src={closeError} alt="" data-test-id='alert-close'/>
            </button>
        </SuccessContainer>
    );
};
