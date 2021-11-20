import { eachDayOfInterval, format } from 'date-fns';

import { CalendarProps, DayProps } from '.';
import { getPlatformDate } from '../../utils/getPlatformDate';
import theme from '../../styles/theme';

export function generateInterval(start: DayProps, end: DayProps) {
    let intervalDate: CalendarProps = {};

    const teste = eachDayOfInterval({
        start: new Date(start.timestamp),
        end: new Date(end.timestamp)
    });

    console.log(teste)
}
