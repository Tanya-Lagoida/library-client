import React, {useState} from 'react';

import {NavLink} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError, FetchBaseQueryMeta,
    MutationDefinition
} from '@reduxjs/toolkit/query';
import {
    AssistiveText,
    AssistiveTextBoxStepOne, AssistiveTextError, BottomFrame, FormContainer,
    LabelBox, Registration,
    TextFields
} from '../authorization/styles';
import checkPassword from '../pages/images/Icon_Other.svg';
import {ButtonAndBottomFrameRegistration, InputStylesSteps, TitleForm} from './styles';
import {ButtonComponent} from '../pages/components/button/button-component';
import {LabelText} from '../pages/labels/labels';
import {useMediaQuery} from '../pages/hooks/use-media-query';
import {device} from '../pages/main/styles';

import {Arrow} from '../pages/images/arrow';
import {EColors} from '../pages/themes/themes';
import {EyeClosed} from '../pages/images/eye-closed';
import {Eye} from '../pages/images/eye';
import {TUseStateType} from './registration-container';
import {TAuthorizationResponse, TRegistrationRequest} from '../services/login-service-types';
import {regesp} from '../constants/regesp';
import {getCommonButtonProps} from '../func/get-common-button-props';

type TFormComponentTypes = {
    registration: MutationTrigger<MutationDefinition<TRegistrationRequest, BaseQueryFn<string | FetchArgs, unknown,
        FetchBaseQueryError, { shout?: boolean }, FetchBaseQueryMeta>, never, TAuthorizationResponse, 'userApi'>>
    stepRegistration: number
    setStepRegistration: (prevState: (prevState: number) => number) => void
    setState?: (value: TUseStateType) => void
    state: { email: string | null, username: string | null, password: string | null, firstName: string | null, lastName: string | null, phone: string | null }
}

export const StepOne: React.FC<TFormComponentTypes> = ({
    setStepRegistration,
    stepRegistration,
    setState,
    state,

}) => {
    const isMobileView = useMediaQuery(`${device.mobileS}`);
    const {
        register,
        getFieldState,
        handleSubmit,
        trigger,
        clearErrors,
        getValues,
        setValue,
        formState: {errors}
    } = useForm<{ username: string, password: string }>({
        shouldFocusError: false,
        criteriaMode: 'all'
    });
    const [passwordType, setPasswordType] = useState('password');
    const [isTotalErrorRedUsername, setIsTotalErrorRedUsername] = useState<boolean | undefined>(false);
    const [isTotalErrorRedPassword, setIsTotalErrorRedPassword] = useState<boolean | undefined>(false);
    const [isCheckmark, setIsCheckmark] = useState<boolean>(false);
    const [isFieldEmptyError, setIsFieldEmptyError] = useState<boolean>(false);
    const [isButtonEyeVisible, setIsButtonEyeVisible] = useState<boolean>(false);

    const onSubmitIncreaseStep = () => {
        setStepRegistration((prevState: number) => prevState + 1);
    };

    const onSubmitOne = ({username, password}: { username: string, password: string }): void => {
        if (setState) {
            setState({...state, username, password});
        }
        onSubmitIncreaseStep();
    };

    const togglePassword = ( ) => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else if (passwordType === 'text') {
            setPasswordType('password');
        }
    };
    const commonButtonProps = getCommonButtonProps(isMobileView);

    return (
        <FormContainer
            onSubmit={handleSubmit(onSubmitOne)} data-test-id="register-form">
            <TitleForm>
                <LabelText
                    variantText="large24">Регистрация
                </LabelText>
                <LabelText
                    variantText="medium14Bold">{stepRegistration} шаг из 3
                </LabelText>
            </TitleForm>
            <TextFields>
                <InputStylesSteps
                    errorBorder={errors.username}
                    type="text"
                    id="username"
                    {...register('username', {
                        required: true,
                        pattern: regesp.englishLettersAndNumbers,
                        validate: {
                            matchLetterPattern: (value) => regesp.englishLetters.test(value),
                            matchNumberPattern: (value) => regesp.numbers.test(value)
                        }
                    })}
                    onClick={() => {
                        if (errors.username) {
                            setIsTotalErrorRedUsername(false);
                            setIsFieldEmptyError(false);
                            clearErrors('username');
                        }
                    }}
                    onBlur={async () => {
                        setIsFieldEmptyError(true);
                        setIsTotalErrorRedUsername(true);
                        await trigger('username');
                        const {error: userNameError, isDirty} = getFieldState('username');

                        if ((!userNameError)) {
                            setIsTotalErrorRedUsername(false);
                        }
                        if ((!userNameError)) {
                            setIsFieldEmptyError(false);
                        }
                        if (isDirty) {
                            setIsFieldEmptyError(false);
                        }
                    }}
                    onChange={async (event) => {
                        if (!errors.username) {
                            setIsTotalErrorRedUsername(false);
                        }
                        setValue('username', event.currentTarget.value, {shouldDirty: true});
                        await trigger('username');
                    }}
                    placeholder="Придумайте логин для входа"/>
                <LabelBox htmlFor="username">Придумайте логин для
                    входа</LabelBox>

                {
                    isFieldEmptyError ?
                        <AssistiveTextBoxStepOne>
                            <AssistiveTextError data-test-id="hint">
                                Поле не может быть пустым
                            </AssistiveTextError>
                        </AssistiveTextBoxStepOne>
                        :
                        isTotalErrorRedUsername ?
                            <AssistiveTextBoxStepOne
                                isTotalErrorRedUsername={isTotalErrorRedUsername}>
                                <AssistiveTextError data-test-id="hint">
                                    Используйте для логина латинский алфавит и цифры
                                </AssistiveTextError>
                            </AssistiveTextBoxStepOne>
                            :
                            <AssistiveTextBoxStepOne>
                                <AssistiveText data-test-id="hint">
                                    Используйте для логина {
                                    errors?.username?.types?.matchLetterPattern ?
                                        <AssistiveTextError>
                                            латинский алфавит
                                        </AssistiveTextError> :
                                        <AssistiveText>латинский алфавит</AssistiveText>
                                } и {
                                    errors?.username?.types?.matchNumberPattern ?
                                        <AssistiveTextError>
                                            цифры
                                        </AssistiveTextError> :
                                        <AssistiveText>цифры</AssistiveText>
                                }
                                </AssistiveText>
                            </AssistiveTextBoxStepOne>
                }
            </TextFields>
            <TextFields>
                <InputStylesSteps
                    errorBorder={errors.password}
                    type={passwordType}
                    id="password"
                    {...register('password', {
                        required: true,
                        validate: {
                            checkLength: (value) => value.length >= 8,
                            matchLetterPattern: (value) => regesp.lettersUpperCase.test(value),
                            matchNumberPattern: (value) => regesp.numbers.test(value)
                        }
                    })}
                    onClick={() => {
                        setIsButtonEyeVisible(true);
                        if (errors.password) {
                            setIsTotalErrorRedPassword(false);
                            clearErrors('password');
                        }
                    }}
                    onBlur={async () => {
                        setIsTotalErrorRedPassword(true);
                        await trigger('password');
                        const {error: userPasswordError} = getFieldState('password');

                        if (!userPasswordError) {
                            setIsTotalErrorRedPassword(false);
                        }
                        if (!getValues('password')) {
                            setIsButtonEyeVisible(false);
                        }
                    }}

                    onChange={async (event) => {
                        setValue('password', event.currentTarget.value, {shouldDirty: true});
                        await trigger('password');
                        const {isDirty, error} = getFieldState('password');

                        if (!error) {
                            setIsTotalErrorRedPassword(false);
                        }
                        if (isDirty && !error) {
                            setIsCheckmark(true);
                        }
                        if (isDirty && error) {
                            setIsCheckmark(false);
                        }
                    }}
                    placeholder="Пароль"/>
                <LabelBox htmlFor="password">Пароль</LabelBox>
                {
                    isCheckmark ?
                        <img src={checkPassword} alt="" data-test-id="checkmark"/> : null
                }
                {
                    isButtonEyeVisible &&
                    <button
                        type="button"
                        onClick={togglePassword}>
                        {
                            passwordType === 'password' ?
                                <EyeClosed data-test-id="eye-closed"/>
                                :
                                <Eye data-test-id="eye-opened"/>
                        }
                    </button>
                }

                {
                    errors.password?.type === 'required' ?
                        <AssistiveTextBoxStepOne>
                            <AssistiveTextError data-test-id="hint">
                                Поле не может быть пустым
                            </AssistiveTextError>
                        </AssistiveTextBoxStepOne>
                        :
                        isTotalErrorRedPassword ?
                            <AssistiveTextBoxStepOne
                                isTotalErrorRedPassword={isTotalErrorRedPassword}>
                                <AssistiveTextError data-test-id="hint">
                                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                                </AssistiveTextError>
                            </AssistiveTextBoxStepOne>
                            :
                            <AssistiveTextBoxStepOne>
                                <AssistiveText data-test-id="hint">
                                    Пароль {
                                    errors?.password?.types?.checkLength ? <AssistiveTextError>
                                            не менее 8 символов
                                        </AssistiveTextError>
                                        : <AssistiveText>
                                            не менее 8 символов
                                        </AssistiveText>
                                }
                                    , с {errors?.password?.types?.matchLetterPattern ?
                                    <AssistiveTextError>
                                        заглавной буквой
                                    </AssistiveTextError> : <AssistiveText>
                                        заглавной буквой
                                    </AssistiveText>
                                } и {errors?.password?.types?.matchNumberPattern ?
                                    <AssistiveTextError>
                                        цифрой
                                    </AssistiveTextError> : <AssistiveText>
                                        цифрой
                                    </AssistiveText>
                                }
                                </AssistiveText>
                            </AssistiveTextBoxStepOne>
                }
            </TextFields>
            <ButtonAndBottomFrameRegistration>
                {
                    errors.username || errors.password ?
                        <ButtonComponent
                            disabled={true}
                            error={errors}
                            {...commonButtonProps}
                        >
                            <LabelText
                            variantText={isMobileView ? 'smallLS' : 'medium16LS'}>следующий
                            шаг</LabelText>
                        </ButtonComponent>
                        :
                        <ButtonComponent
                            {...commonButtonProps}
                        >
                            <LabelText
                            variantText={isMobileView ? 'smallLS' : 'medium16LS'}>следующий
                            шаг</LabelText>
                        </ButtonComponent>
                }
                <BottomFrame>
                    <LabelText
                        variantText={isMobileView ? 'medium15LH' : 'medium16LH24'}>Есть
                        учётная запись?</LabelText>
                    <NavLink to="/auth">
                        <Registration>
                            <LabelText variantText="smallLS">войти</LabelText>
                            <Arrow stroke={EColors.Inherit}/>
                        </Registration>
                    </NavLink>
                </BottomFrame>
            </ButtonAndBottomFrameRegistration>
        </FormContainer>
    );
};
