import styled from 'styled-components';

import {EColors} from '../pages/themes/themes';

import {TCalendarDayCellProps} from './calendar';

export const MainWrapper = styled.div`
    width: 256px;
    //height: 240px;
    border-radius: 8px;
    padding: 16px 16px 0 16px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(191, 196, 201, 0.2), 0 3px 4px rgba(191, 196, 201, 0.18), 0 1px 5px rgba(191, 196, 201, 0.24);

`;
export const CalendarHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

`;
export const ButtonMonthContainer = styled.div`
    display: flex;
    gap: 12px;

    button {
        border: none;
        background: none;
        cursor: pointer;
    }

    button img {
        width: 16px;
        height: 16px;
    }

`;
export const ButtonMonth = styled.button`
    transform: rotate(180deg);
`;
export const WeekDaysWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const WeekDayCell = styled.div`
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: transparent;
    background: linear-gradient(231.58deg, #F83600 -53.35%, #F9D423 297.76%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const CalendarContentWrapper = styled.div`
    display: flex;

`;
export const ButtonDate = styled.button<{ isDisabled: any }>`
    border: none;
    background: none;
    cursor: ${((props) => props.isDisabled ? 'pointer' : 'none')};

`;

export const CalendarDayCell = styled.div<TCalendarDayCellProps>`
    cursor: pointer;
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({isWeekEndDay, isSelectedDay}) => isWeekEndDay
        ? EColors.ErrorBack
        : isSelectedDay ? 'linear-gradient(233.73deg, #F83600 -16.08%, #F9D423 327.37%)' : EColors.White
    };
    border-radius: 16px;


    span {
        color: transparent;
        background: ${({isCurrentDay, isWeekEndDay, isSelectedDay, isNextWorkingDay}) =>
            isSelectedDay
                ? EColors.White
                : isCurrentDay
                    ? 'linear-gradient(233.73deg, #F83600 -16.08%, #F9D423 327.37%)'
                    : isWeekEndDay ? EColors.Grey
                        : isNextWorkingDay ? EColors.Inherit : EColors.GreyBorder
        };
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }


`;
export const ArrowButton = styled.button`
    border: none;
    background: none;
    border-radius: 16px;

`;
export const MonthSelect = styled.div`
    margin-left: 8px;
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    cursor: pointer;
    span {
        color: ${EColors.Grey};
    }


`;
export const MonthContainer = styled.div<{ isMonthOpen: boolean }>`
    flex-direction: column;
    gap: 2px;
    display: ${(props) => props.isMonthOpen ? 'flex' : 'none'};
    position: absolute;
    top: 20px;
    left: 5px;
    background: white;
    z-index: 10;
    border: 1px solid orange;
    button {
        border: none;
        background: none;
        color: ${EColors.Grey};
        cursor: pointer;

    }

`;
