import { FC } from 'react';

export interface ChoreInfoProps {
  choreID: number;
}

export const ChoreInfo: FC<ChoreInfoProps> = ({ choreID }) => {
  return <>Info {choreID}</>;
};
