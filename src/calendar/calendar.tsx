import React, {useCallback, useMemo, useState} from 'react';
import dayjs, {Dayjs} from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';

import arrow from '../pages/images/arrow_drop_down.svg';
import navigateCalendar from '../pages/images/stroke-black.svg';
import {LabelText} from '../pages/labels/labels';

import {
    ArrowButton, ButtonDate, ButtonMonth, ButtonMonthContainer,
    CalendarContentWrapper, CalendarDayCell,
    CalendarHeaderWrapper,
    MainWrapper, MonthContainer, MonthSelect,
    WeekDayCell,
    WeekDaysWrapper
} from './styles';

import 'dayjs/locale/ru';

const weekdaysShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

type TCalendar = {
    selectedDay: Date | null;
    setSelectedDay: (value: Date | null) => void;
    dateState: any

};

export type TCalendarDayCellProps = {
    isCurrentDay: boolean;
    isNextWorkingDay: boolean;
    isWeekEndDay: boolean;
    isSelectedDay: boolean;
};

type TCalendarDayCell = {
    calendarDayCell: Date;
    props: TCalendarDayCellProps;
};

const getIsCurrentDay = (day: Date, currentDay: Date, selectedDate: Dayjs): boolean => {
    if (currentDay.getMonth() !== selectedDate.month()) return false;

    return dayjs(day).isSame(dayjs(currentDay), 'date');
};

const getIsNextWorkingDay = (day: Date, currentDay: Date, selectedDate: Dayjs): boolean => {
    dayjs.extend(weekday);
    dayjs.updateLocale('ru', {weekdaysShort, months});
    const currentDayjs = dayjs(currentDay);
    const currentDayIndex = currentDayjs.day();
    const nextWorkingDay = currentDayIndex === 6 || currentDayIndex === 0 ? currentDayjs.weekday(7) : currentDayjs.add(1, 'day');

    if (nextWorkingDay.month() !== selectedDate.month()) return false;

    return nextWorkingDay.isSame(dayjs(day), 'date');
};

const getIsWeekEndDay = (day: Date, selectedDate: Dayjs): boolean => {
    if (day.getMonth() !== selectedDate.month()) return false;

    const dayIndex = day.getDay();

    return dayIndex === 6 || dayIndex === 0;
}

const getIsSelectedDay = (day: Date, selectedDay: Date | null): boolean => selectedDay ? dayjs(day).isSame(dayjs(selectedDay), 'date') : false;

const getCalendarDayCellProps = (day: Date, currentDay: Date, selectedDate: Dayjs, selectedDay: Date | null): TCalendarDayCellProps => ({
    isCurrentDay: getIsCurrentDay(day, currentDay, selectedDate),
    isNextWorkingDay: getIsNextWorkingDay(day, currentDay, selectedDate),
    isWeekEndDay: getIsWeekEndDay(day, selectedDate),
    isSelectedDay: getIsSelectedDay(day, selectedDay),
});

export const Calendar = ({selectedDay, setSelectedDay, dateState}: TCalendar) => {
    dayjs.locale('ru',);
    dayjs.extend(isTomorrow);
    dayjs.extend(updateLocale);
    dayjs.extend(weekday);
    dayjs.extend(isoWeek);

    dayjs.updateLocale('ru', {weekdaysShort, months});

    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [isMonthOpen, setIsMonthOpen] = useState<boolean>(false);

    const currentDay = useMemo(() => dayjs().toDate(), []);
    const firstDayOfTheMonth = useMemo(
        () => selectedDate.clone().startOf('month'),
        [selectedDate]
    );

    const firstDayOfFirstWeekOfMonth = useMemo(
        () => dayjs(firstDayOfTheMonth).startOf('week'),
        [firstDayOfTheMonth]
    );
    const generateFirstDayOfEachWeek = useCallback((day: Dayjs): Dayjs[] => {
        const dates: Dayjs[] = [day];

        for (let i = 1; i < 6; i++) {
            const date = day.clone().add(i, 'week');

            if (date.month() === selectedDate.month()) dates.push(date);
        }

        return dates;
    }, [selectedDate]);

    const generateWeek = useCallback((day: Dayjs): TCalendarDayCell[] => {
        const dates: TCalendarDayCell[] = [];

        for (let i = 0; i < 7; i++) {
            const date = day.clone().add(i, 'day').toDate();

            const calendarDayCellProps = getCalendarDayCellProps(date, currentDay, selectedDate, selectedDay);

            dates.push({calendarDayCell: date, props: calendarDayCellProps});
        }

        return dates;
    }, [currentDay, selectedDate, selectedDay]);
    const generateWeeksOfTheMonth = useMemo((): TCalendarDayCell[][] => {
        const firstDayOfEachWeek = generateFirstDayOfEachWeek(firstDayOfFirstWeekOfMonth);

        return firstDayOfEachWeek.map((date) => generateWeek(date));
    }, [generateFirstDayOfEachWeek, firstDayOfFirstWeekOfMonth, generateWeek]);

    const handleClickOnDate = (date: Date | null) => {
        setSelectedDay(date);
    }

    const handleMonthClick = (monthIndex: number) => {
        setSelectedDate((date) => date.month(monthIndex));
        setIsMonthOpen(false);
    }

    return (
        <MainWrapper
            data-test-id='calendar'
        >
            <CalendarHeaderWrapper>
                <MonthSelect
                    data-test-id='month-select'
                onClick={() => setIsMonthOpen((previousValue) => !previousValue)}
                >
                    <LabelText
                        variantText="medium16LH24"
                    >{selectedDate.clone().format('MMMM YYYY')}
                    </LabelText>
                    <ArrowButton
                        type="button"
                    >
                        <img src={arrow} alt=""/>

                    </ArrowButton>
                </MonthSelect>
                {
                    isMonthOpen ?
                        <MonthContainer
                            isMonthOpen={isMonthOpen}
                        >
                            {months.map((month, monthIndex) => (
                                <button key={month} type='button' onClick={() => handleMonthClick(monthIndex)}>
                                    <LabelText variantText="medium14Norm">
                                        {month}
                                    </LabelText>
                                </button>
                            ))}

                        </MonthContainer>
                        : null
                }
                <ButtonMonthContainer>
                    <button
                        data-test-id='button-prev-month'
                        type="button"
                        onClick={() => setSelectedDate((date) => date.subtract(1, 'month'))}
                    >
                        <img src={navigateCalendar} alt=""/>
                    </button>
                    <ButtonMonth
                        data-test-id='button-next-month'
                        type="button"
                        onClick={() => setSelectedDate((date) => date.add(1, 'month'))}
                    >
                        <img src={navigateCalendar} alt=""/>
                    </ButtonMonth>
                </ButtonMonthContainer>
            </CalendarHeaderWrapper>
            <WeekDaysWrapper>
                {generateWeeksOfTheMonth[0].map((day, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <WeekDayCell key={`week-day-${index}`}>
                        <LabelText
                            variantText="small500"
                        >
                            {dayjs(day.calendarDayCell).format('ddd')}
                        </LabelText>
                    </WeekDayCell>
                ))}
            </WeekDaysWrapper>
            {generateWeeksOfTheMonth.map((week, weekIndex) => (

                <CalendarContentWrapper
                    // eslint-disable-next-line react/no-array-index-key
                    key={`week-${weekIndex}`}
                >
                    {week.map((day) => (
                        <ButtonDate
                            key={day.calendarDayCell.getTime()}
                            disabled={day.props.isWeekEndDay || (!day.props.isCurrentDay && !day.props.isNextWorkingDay)}
                            isDisabled={day.props.isWeekEndDay || (!day.props.isCurrentDay && !day.props.isNextWorkingDay)}
                            type="button"
                            onClick={() => handleClickOnDate(day.calendarDayCell)}
                        >
                            <CalendarDayCell
                                isCurrentDay={day.props.isCurrentDay}
                                isNextWorkingDay={day.props.isNextWorkingDay}
                                isWeekEndDay={day.props.isWeekEndDay}
                                isSelectedDay={day.props.isSelectedDay}
                            >
                                <LabelText
                                    data-test-id='day-button'
                                    variantText="smallLSMonth">
                                    {day.calendarDayCell.getDate()}
                                </LabelText>
                            </CalendarDayCell>

                        </ButtonDate>

                    ))}
                </CalendarContentWrapper>
            ))}
        </MainWrapper>
    );
};
