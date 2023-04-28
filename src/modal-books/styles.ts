import styled from 'styled-components';

import {device} from '../pages/main/styles';
import {EColors} from '../pages/themes/themes';

export const Modal = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 5000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.25);
    animation-name: appear;
    animation-duration: 300ms;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
`
export const ModalDialog = styled.div<{typeModal: string}>`
    width: 528px;
    background: ${EColors.White};
    position: relative;
    padding: 48px 56px;
    height: ${(props) => props.typeModal === 'booking' ? '512px'
        : props.typeModal === 'editBooking' ? '580px' : '508px'};
    text-align: left;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    @media screen and ${device.mobileS} {
        padding: 48px 16px 32px;
        height: ${(props) => props.typeModal === 'booking' ? '458px'
            : props.typeModal === 'editBooking' ? '580px' : '514px'};
        width: 288px;
        gap: 24px;
    }
`
export const YourMarkBlock = styled.div`
display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
`
export const ModalHeaderContainer = styled.div`
    justify-self: center;
    div {
        display: flex;
        flex-direction: column;
        width: 200px;
    }
    span {
        justify-self: center;
        align-self: center;
        text-align: center;
    }
`
export const ModalHeader = styled.div<{typeModal: string}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: ${(props) => props.typeModal === 'booking' && '300px'};
    @media screen and ${device.mobileS} {
        width: ${(props) => props.typeModal === 'booking' && '200px'};
    }
`
export const ModalFooter = styled.div`
    justify-content: flex-end;
    display: flex;
    align-items: center;
`
export const ModalClose = styled.button`
    position: absolute;
    top: 32px;
    right: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    width: 48px;
    height: 48px;
    background: ${EColors.LightGrey};
    @media screen and ${device.mobileS} {
        width: 32px;
        height: 32px;
        top: 16px;
        right: 16px;
    }
    img {
        width: 24px;
        height: 24px;
        @media screen and ${device.mobileS} {
            width: 16px;
            height: 16px;
        }
    }
`
export const ModalBody = styled.div`
`
export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 36px;
    @media screen and ${device.mobileS} {
        gap: 24px;
    }
`
export const TextArea = styled.textarea`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    position: relative;
    width: 416px;
    resize: none;
    border: none;
    height: 132px;
    border-radius: 4px;
    padding: 19px 12px;
    background: ${EColors.LightGrey};
    margin-bottom: 20px;
    @media screen and ${device.mobileS} {
        width: 256px;
    }
    ::placeholder {
        position: absolute;
        letter-spacing: 0.1px;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        color: ${EColors.Grey};
    }
    :focus {
        outline: none;
    }
`
export const EditButtonContainer = styled.div`
display: flex;
    flex-direction: column;
    gap: 16px;
`
