import { FC, useState } from 'react';
import { Button, Center, Image, SimpleGrid, Spinner } from '@chakra-ui/react';
import { ChorePhotoPreview } from './ChorePhotoPreview';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { choreService } from '../../api/services/ChoreService';

export interface ChorePhotosGridProps {
  choreID: number;
}

export const ChorePhotosGrid: FC<ChorePhotosGridProps> = ({ choreID }) => {
  const [photoName, setPhotoName] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { data, isFetching, isError } = useQuery(Queries.CHORE_PHOTOS, () =>
    choreService.getPhotos(choreID),
  );

  if (isFetching) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError || !data) {
    return <Center>Podczas pobierania zdjęć obowiązku domowego wystąpił błąd.</Center>;
  }

  if (data.length === 0) {
    return <Center>Ten obowiązek domowy nie posiada zdjęć w galerii.</Center>;
  }

  const openPhotoPreview = (photoName: string) => {
    setPhotoName(photoName);
    setModalOpen(true);
  };

  const closePhotoPreview = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ChorePhotoPreview
        isOpen={isModalOpen}
        onClose={closePhotoPreview}
        choreID={choreID}
        photoName={photoName}
      />
      <SimpleGrid columns={5} spacing="8">
        {data.map((photo) => (
          <Button
            key={photo.name}
            borderColor="gray.300"
            borderWidth="1px"
            width="100%"
            height="200px"
            padding="0"
            onClick={() => openPhotoPreview(photo.name)}
          >
            <Image maxHeight="200px" src={photo.url} alt="Zdjęcie" />
          </Button>
        ))}
      </SimpleGrid>
    </>
  );
};
