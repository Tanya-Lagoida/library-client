import styled from 'styled-components';

import { labelVariants } from '../../labels/labels';
import { device } from '../../main/styles';
import { EColors } from '../../themes/themes';

export const HeaderStylesContainer = styled.div<{ isPersonMenuClose: boolean }>`
@media screen and ${device.mobileS} {
      width: 0;
      padding: 0;
    }
    @media screen and ${device.tablet} {
    width: 0;
      padding: 0;
    }
    @media screen and ${device.laptopL} {
      padding: 0 165px;
box-shadow: ${(props) => !props.isPersonMenuClose && '4px 4px 4px rgba(54, 54, 54, 0.05), -4px 4px 4px rgba(54, 54, 54, 0.05)'};
width: 1440px;
    }

`
export const HeaderStyles = styled.div`
    @media screen and ${device.mobileS} {
        height: 76px;
        width: 288px;
        display: flex;
        align-items: center;
        justify-items: start;
    }
    @media screen and ${device.tablet} {
        height: 96px;
        width: 640px;
        display: flex;
        padding: 32px 0 24px 0;

    }
    @media screen and ${device.laptopL} {
        height: 105px;
        width: 1110px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 41px 0 24px 0;
    }
`;
export const Logo = styled.img`
    @media screen and ${device.laptopL} {
        height: 40px;
        width: 40px;
    }
`;
export const CleverLand = styled.img`
    @media screen and ${device.laptopL} {
        height: 15.67px;
        width: 111px;
    }
`;
export const Library = styled.header`
    @media screen and ${device.mobileS} {
        ${labelVariants.medium18}
    }
`;
export const Avatar = styled.img`
    @media screen and ${device.mobileS} {
        display: none;
        width: 0;
        height: 0;
    }
    @media screen and ${device.tablet} {
        display: none;
        width: 0;
        height: 0;
    }
    @media screen and ${device.laptopL} {
        height: 58px;
        width: 58px;
        display: block;
    }
`;
export const Hello = styled.span`
    @media screen and ${device.mobileS} {
        display: none;
        width: 0;
    }
    @media screen and ${device.tablet} {
        display: none;
        width: 0;
    }
    @media screen and ${device.laptopL} {
        width: 226px;
        display: flex;
        justify-content: right;
    }
`;
export const LogoAndLibrary = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    @media screen and ${device.mobileS} {
        justify-content: start;
    }
    @media screen and ${device.tablet} {
        justify-content: start;
    }
    @media screen and ${device.laptopL} {
        width: 495px;
        height: 40px;
        justify-content: space-between;
    }
`;

export const PersonContainer = styled.div`
position: relative;
`
export const Person = styled.div`
    @media screen and ${device.mobileS} {
        display: none;
        width: 0;
        gap: 0;
    }
    @media screen and ${device.tablet} {
        display: none;
        width: 0;
        gap: 0;
    }
    @media screen and ${device.laptopL} {
        flex-direction: row;
        display: flex;
        gap: 16px;
        align-items: center;
        width: 300px;
        position: relative;
        cursor: pointer;
    }
`;
export const LogoBox = styled.div`
    @media ${device.mobileS} {
        display: none;
        gap: 0;

    }
    @media ${device.tablet} {
        display: none;
        gap: 0;
    }
    @media screen and ${device.laptopL} {
        flex-direction: row;
        display: flex;
        gap: 8px;
        align-items: center;
    }
`;
export const BurgerMenu = styled.div<{ isMenuCollapsed: boolean }>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and ${device.mobileS} {
         margin: ${(props) => props.isMenuCollapsed ? '0 26px 0 3px' : '0 28px 0 3px'} ;
        gap: 4px;
    }
    @media screen and ${device.tablet} {
        margin: ${(props) => props.isMenuCollapsed ? '0 26px 0 3px' : '0 28px 0 3px'} ;
        gap: 5.33px;
    }
    @media ${device.laptopL} {
        display: none;
    }
`;

export const LineOne = styled.div<{ isMenuCollapsed: boolean }>`

    @media screen and  ${device.mobileS} {
        border-bottom: 2.8px solid;
        width: ${(props) => props.isMenuCollapsed ? '19px' : '17px'};
        transform: ${(props) => props.isMenuCollapsed ? 'rotate(0deg)' : 'translateY(3px) rotate(45deg) '};
        border-image: ${(props) => props.isMenuCollapsed ? 'none' : `linear-gradient(231.58deg, ${EColors.Red} -53.35%, ${EColors.Yellow} 297.76%) 1 0`};
        border-color: ${(props) => props.isMenuCollapsed ? `${EColors.Inherit}` : 'none'};

    }
    @media screen and ${device.tablet} {
        border-bottom: 2.8px solid;
        width: ${(props) => props.isMenuCollapsed ? '26.67px' : '25px'};
        transform: ${(props) => props.isMenuCollapsed ? 'rotate(0deg)' : 'translateY(4px) rotate(45deg) '};
        border-image: ${(props) => props.isMenuCollapsed ? 'none' : `linear-gradient(231.58deg, ${EColors.Red} -53.35%, ${EColors.Yellow} 297.76%) 1 0`};
        border-color: ${(props) => props.isMenuCollapsed ? `${EColors.Inherit}` : 'none'};
    }
`;
export const LineTwo = styled.div<{ isMenuCollapsed: boolean }>`
    display: ${(props) => props.isMenuCollapsed ? 'block' : 'none'};
    @media screen and  ${device.mobileS} {
        width: 19px;
        border-bottom: 2.8px solid ${EColors.Inherit};

    }
    @media screen and ${device.tablet} {
        border-bottom: 2.8px solid ${EColors.Inherit};
        width: 26.67px;

    }
`;
export const LineThree = styled.div<{ isMenuCollapsed: boolean }>`

    @media screen and  ${device.mobileS} {
        width: ${(props) => props.isMenuCollapsed ? '19px' : '17px'};
        border-bottom-width: 2.8px;
        border-bottom-style: solid;
        transform: ${(props) => props.isMenuCollapsed ? 'rotate(0deg)' : 'translateY(-3px) rotate(-45deg) '};
        border-image: ${(props) => props.isMenuCollapsed ? 'none' : `linear-gradient(231.58deg, ${EColors.Red} -53.35%, ${EColors.Yellow} 297.76%) 1 0`};
        border-color: ${(props) => props.isMenuCollapsed ? `${EColors.Inherit}` : 'none'};
    }
    @media screen and ${device.tablet} {
        border-bottom-width: 2.8px;
        border-bottom-style: solid;
        width: ${(props) => props.isMenuCollapsed ? '26.67px' : '25px'};
        transform: ${(props) => props.isMenuCollapsed ? 'rotate(0deg)' : 'translateY(-4px) rotate(-45deg) '};
        border-image: ${(props) => props.isMenuCollapsed ? 'none' : `linear-gradient(231.58deg, ${EColors.Red} -53.35%, ${EColors.Yellow} 297.76%) 1 0`};
        border-color: ${(props) => props.isMenuCollapsed ? `${EColors.Inherit}` : 'none'};
    }
`;
export const ProfileAndExit = styled.div<{ isPersonMenuClose: boolean }>`
@media screen and ${device.mobileS} {
        display: none;
    }
    @media screen and ${device.tablet} {
       display: none;
    }
    @media screen and ${device.laptopL} {
    background-color: ${EColors.White};
       z-index: 20;
     position: absolute;
    width: 270px;
    height: 152px;
    top: 72px;
    right: 0;
    display: ${(props) => props.isPersonMenuClose ? 'none' : 'flex'};
    flex-direction: column;
    gap: 32px;
    padding: 32px 24px;
    align-items: end;
    box-shadow: ${(props) => !props.isPersonMenuClose && '4px 4px 4px rgba(54, 54, 54, 0.05), -4px 4px 4px rgba(54, 54, 54, 0.05)'};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    }
    button {
        background: none;
        border: none;
    }
`
