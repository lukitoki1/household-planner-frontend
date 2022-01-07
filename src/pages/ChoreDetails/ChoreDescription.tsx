import { FC } from 'react';

export interface ChoreDescriptionProps {
  choreID: number;
}

export const ChoreDescription: FC<ChoreDescriptionProps> = ({ choreID }) => {
  return <>Opis {choreID}</>;
};
