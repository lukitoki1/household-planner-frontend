import { FC, useRef, useState } from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { choreService } from '../../api/services/ChoreService';
import { useAppToast } from '../../components/Toast/useToast';
import { Queries } from '../../api/queries';

export interface ChorePhotoUploadProps {
  choreID: number;
}

export const ChorePhotoUpload: FC<ChorePhotoUploadProps> = ({ choreID }) => {
  const { triggerToast } = useAppToast();
  const queryClient = useQueryClient();

  const mutation = useMutation((payload: FormData) => choreService.addPhoto(choreID, payload));

  const [file, setFile] = useState<File | undefined>();

  const photoInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('photo', file, file.name);

    try {
      await mutation.mutateAsync(formData);
      triggerToast({
        title: 'Dodano zdjęcie',
        description: `Pomyślnie dodano zdjęcie do galerii obowiązku domowego.`,
        status: 'success',
      });

      queryClient.invalidateQueries(Queries.CHORE_PHOTOS);
      setFile(undefined);

      if (photoInputRef.current) {
        photoInputRef.current.value = '';
      }
    } catch {}
  };

  return (
    <Box
      width="full"
      borderRadius="8px"
      borderColor="gray.300"
      borderWidth="1px"
      padding="4"
      marginBottom="8"
    >
      <HStack>
        <input
          ref={photoInputRef}
          id="aaa"
          style={{ width: '100%' }}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <Button onClick={onSubmit} isLoading={mutation.isLoading} isDisabled={!file}>
          Dodaj zdjęcie
        </Button>
      </HStack>
    </Box>
  );
};
