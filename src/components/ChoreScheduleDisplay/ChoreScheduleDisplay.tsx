import { FC } from 'react';
import { formatDate, formatTime } from '../../helpers/time';
import { Text } from '@chakra-ui/react';

export interface ChoreScheduleDisplayProps {
  startDate: Date;
  intervalDays: number;
  isItalic?: boolean;
}

export const ChoreScheduleDisplay: FC<ChoreScheduleDisplayProps> = ({
  startDate,
  intervalDays,
  isItalic,
}) => {
  const content = (
    <>
      {intervalDays === 1 ? 'Codziennie ' : `Co ${intervalDays} dni `} o {formatTime(startDate)}
      {' od '}
      {formatDate(startDate)}
    </>
  );

  return isItalic ? (
    <Text fontStyle="italic" color="gray.500">
      {content}
    </Text>
  ) : (
    <Text>{content}</Text>
  );
};
