import { format } from 'date-fns';

export const formatDateTime = (date: Date): string => format(date, 'dd.MM.yyyy HH:mm');
export const formatDate = (date: Date): string => format(date, 'dd.MM.yyyy');
export const formatTime = (date: Date): string => format(date, 'HH:mm');
