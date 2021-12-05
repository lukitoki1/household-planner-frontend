import { format } from 'date-fns';

export const formatDateTime = (date: Date): string => format(date, 'dd.MM.yyyy HH:mm');
