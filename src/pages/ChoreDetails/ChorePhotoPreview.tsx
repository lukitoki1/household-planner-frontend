import { FC, useEffect } from 'react';
import {
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { choreService } from '../../api/services/ChoreService';

export interface ChorePhotoPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  choreID: number;
  photoName: string;
}

export const ChorePhotoPreview: FC<ChorePhotoPreviewProps> = ({
  isOpen,
  onClose,
  choreID,
  photoName,
}) => {
  const { data, isFetching, isError, refetch } = useQuery(
    [Queries.CHORE_PHOTOS, choreID, photoName],
    () => choreService.getPhoto(choreID, photoName),
    { enabled: false },
  );

  let body;

  if (isFetching) {
    body = <Spinner />;
  } else if (isError || !data) {
    body = <Text>Podczas pobierania zdjęcia wystąpił błąd.</Text>;
  } else {
    body = <Image src={data.url} alt="Zdjęcie" />;
  }

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen]);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="10">
          <Center height="60vh">{body}</Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
