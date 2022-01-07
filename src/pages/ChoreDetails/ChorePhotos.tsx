import { FC } from 'react';

export interface ChorePhotosProps {
  choreID: number;
}

export const ChorePhotos: FC<ChorePhotosProps> = ({ choreID }) => {
  return <>photos {choreID}</>;
};
