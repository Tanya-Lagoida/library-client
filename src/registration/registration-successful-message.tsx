import React from 'react';

import {NavLink} from 'react-router-dom';
import {LabelText} from '../pages/labels/labels';
import {useMediaQuery} from '../pages/hooks/use-media-query';
import {device} from '../pages/main/styles';
import {ButtonComponent} from '../pages/components/button/button-component';
import {AllForm, HeaderLogin} from '../authorization/styles';
import {MessageContainerBox} from '../authorization/errors-container-styles';

export const RegistrationSuccessfulMessage = () => {
    const isMobileView = useMediaQuery(`${device.mobileS}`);

    return (
        <AllForm data-test-id="auth">
            <HeaderLogin>
                <LabelText
                    variantText={isMobileView ? 'medium18LS' : 'large'}>Cleverland</LabelText>
            </HeaderLogin>
            <MessageContainerBox data-test-id='status-block' >
                <LabelText variantText={isMobileView ? 'medium18LS' : 'large24'}>Регистрация
                    успешна</LabelText>
                <div>
                    <LabelText variantText={isMobileView ? 'medium15LH' : 'medium16LH24'}>Регистрация
                        прошла успешно. Зайдите в личный кабинет, используя свои логин и
                        пароль</LabelText>
                </div>
                <NavLink to="/auth">
                    <ButtonComponent
                        height={isMobileView ? '40px' : '52px'}
                        width={isMobileView ? '256px' : '410px'}
                        status="inStock"><LabelText
                        variantText={isMobileView ? 'smallLS' : 'medium16LS'}>вход</LabelText>
                    </ButtonComponent>
                </NavLink>
            </MessageContainerBox>
        </AllForm>
    );
};
