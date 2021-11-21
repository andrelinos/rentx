import { addDays,  } from 'date-fns';
import { Platform } from 'react-native';

export function getPlatformDate(date: Date): any{
    Platform.OS === 'ios' ? addDays(date, 1) : date;
}
