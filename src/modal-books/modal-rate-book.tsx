import React, {ReactNode} from 'react';

import {useMediaQuery} from '../pages/hooks/use-media-query';
import closeModal from '../pages/images/close-input.svg';
import {LabelText} from '../pages/labels/labels';
import {device} from '../pages/main/styles';

import {
    Modal,
    ModalBody,
    ModalClose,
    ModalContent,
    ModalDialog,
    ModalFooter,
    ModalHeader, ModalHeaderContainer
} from './styles';

type TModalTypes = {
    isVisible: boolean
    title: string
    content: ReactNode
    footer: ReactNode
    onClose: () => void
    typeModal: 'booking' | 'reviews' | 'editBooking'
    dataTestId: string
}

export const ModalRateBook: React.FC<TModalTypes> = ({
    isVisible = false,
    title,
    content,
    footer,
    onClose,
    typeModal,
    dataTestId
}) => {
    const isMobileView = useMediaQuery(`${device.mobileS}`);
    const keydownHandler = (key: any) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }

    };

    React.useEffect(() => {
        document.addEventListener('keydown', keydownHandler);

        return () => document.removeEventListener('keydown', keydownHandler);
    });

    return (
        isVisible ? (
            <Modal
                data-test-id='modal-outer'
                onClick={onClose}
            >
                <ModalDialog
                    typeModal={typeModal}
                    data-test-id={dataTestId}
                    onClick={e => e.stopPropagation()}
                >
                    <ModalClose
                        data-test-id='modal-close-button'
                        type="button"
                        onClick={onClose}>
                        <img src={closeModal} alt=""/>
                    </ModalClose>
                    <ModalHeaderContainer>
                        <ModalHeader
                            typeModal={typeModal}
                        >
                            <LabelText
                                data-test-id='modal-title'
                                variantText={isMobileView ? 'medium18LS' : 'large24'}
                            >
                                {title}
                            </LabelText>
                        </ModalHeader>
                    </ModalHeaderContainer>

                    <ModalBody>
                        <ModalContent>
                            {content}
                        </ModalContent>
                    </ModalBody>
                    <ModalFooter>
                        {footer}
                    </ModalFooter>
                </ModalDialog>
            </Modal>
        ) : null
    );

};






