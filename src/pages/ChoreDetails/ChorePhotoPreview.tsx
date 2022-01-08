import { FC, useEffect } from 'react';
import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Queries } from '../../api/queries';
import { choreService } from '../../api/services/ChoreService';
import { BiTrash } from 'react-icons/all';
import { useAppToast } from '../../components/Toast/useToast';

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
  const { triggerToast } = useAppToast();
  const queryClient = useQueryClient();

  const { data, isFetching, isError, refetch } = useQuery(
    [Queries.CHORE_PHOTOS, choreID, photoName],
    () => choreService.getPhoto(choreID, photoName),
    { enabled: false },
  );

  const mutation = useMutation(() => choreService.deletePhoto(choreID, photoName));

  let body;

  if (isFetching) {
    body = <Spinner />;
  } else if (isError || !data) {
    body = <Text>Podczas pobierania zdjęcia wystąpił błąd.</Text>;
  } else {
    body = <Image src={data.url} alt="Zdjęcie" />;
  }

  const onDeletePhotoClick = () => {
    try {
      mutation.mutateAsync();
      queryClient.invalidateQueries(Queries.CHORE_PHOTOS);
      triggerToast({
        title: 'Usunięto zdjęcie',
        description: `Pomyślnie usunięto zdjęcie ${photoName} z galerii obowiązku domowego.`,
        status: 'success',
      });
      onClose();
    } catch {}
  };

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
        <ModalFooter>
          <Button
            leftIcon={<BiTrash />}
            onClick={onDeletePhotoClick}
            isLoading={mutation.isLoading}
          >
            Usuń zdjęcie
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
