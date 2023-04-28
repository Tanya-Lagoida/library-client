import styled from 'styled-components';

import {EColors} from '../../themes/themes';
import {device} from '../../main/styles';

export const ContainerLaptopStyles = styled.div<{images?: Array<{ url: string }> | null}>`
    //height: 658px;
    display: flex;
    justify-content: center;
    gap: 30px;
    align-items: start;
    margin-bottom: 42px;
    @media screen and ${device.laptopL} {
        margin-bottom: ${(props) => props.images?.length && props.images.length > 5 ? '28px' : '42px'};

    }
`;

export const BookName = styled.div`
`;
export const NameAndAuthorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 635px;
    height: 212px;
`;
export const RightContainerBook = styled.div`
    display: flex;
    flex-direction: column;
`;
export const AuthorName = styled.div`
    color: ${EColors.Grey};
    align-self: start;
`;
export const ButtonBookContainer = styled.div`
    @media screen and ${device.mobileS} {
        margin-top: 0;
    }
    @media screen and ${device.tablet} {
        margin-top: 0;
    }
    @media screen and ${device.laptopL} {
        margin: 32px 0 62px 0;

    }

`;
export const PhotoBox = styled.div<{images?: Array<{ url: string }> | null}>`
    width: 445px;
    height: ${(props) => props.images?.length && props.images.length > 5 ? '710px'
        : props.images?.length && props.images.length > 1 && props.images.length <=5 ? '696px'
        : '593px'};
`;
