import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { ChorePhotosGrid } from './ChorePhotosGrid';
import { ChorePhotoUpload } from './ChorePhotoUpload';

export interface ChorePhotosProps {
  choreID: number;
}

export const ChorePhotos: FC<ChorePhotosProps> = ({ choreID }) => {
  return (
    <>
      <Text fontSize="2xl" marginBottom="8">
        Galeria zdjęć
      </Text>
      <ChorePhotoUpload choreID={choreID} />
      <ChorePhotosGrid choreID={choreID} />
    </>
  );
};
