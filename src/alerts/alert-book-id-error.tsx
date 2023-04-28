import React from 'react';

import {ErrorContainer, ErrorIconAndText} from '../error/styles';
import {useMediaQuery} from '../pages/hooks/use-media-query';
import closeError from '../pages/images/close-error.svg';
import warningIcon from '../pages/images/error-icon.svg';
import {LabelText} from '../pages/labels/labels';
import {device} from '../pages/main/styles';

type TPropsType = {
    setIsAlertErrorOpen: (value: boolean) => void
    text: string
}
export const AlertBookIdError: React.FC<TPropsType> = ({setIsAlertErrorOpen, text}) => {
    const isLaptopView = useMediaQuery( `${device.laptopL}`);
    const handleCloseAlert = () => {
        setIsAlertErrorOpen(false)
    }

    return (
        <ErrorContainer data-test-id='error'>
            <ErrorIconAndText>
                <img src={warningIcon} alt=''/>
                <LabelText
                    variantText={isLaptopView  ? 'medium16Bold' : 'medium14Bold'}
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
        </ErrorContainer>
    );
};
