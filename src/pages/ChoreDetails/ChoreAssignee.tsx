import { FC } from 'react';
import { ChoreDTO } from '../../api/dto';
import { Box, Button, Divider, HStack, Text } from '@chakra-ui/react';
import { useAppToast } from '../../components/Toast/useToast';
import { useMutation, useQueryClient } from 'react-query';
import { Queries } from '../../api/queries';
import { choreService } from '../../api/services/ChoreService';
import { BiX } from 'react-icons/all';
import { AddAssignee } from './AddAssignee';
import { UserDisplay } from '../../components/UserDisplay/UserDisplay';

export interface ChoreAssigneeProps {
  chore: ChoreDTO;
}

export const ChoreAssignee: FC<ChoreAssigneeProps> = ({ chore }) => {
  const { triggerToast } = useAppToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(choreService.deleteAssignee);

  const deleteAssignee = async () => {
    try {
      await mutation.mutateAsync(chore.id);
      triggerToast({
        title: 'Usunięto wykonawcę obowiązku domowego',
        description: `Pomyślnie usunięto wykonawcę do obowiązku domowego.`,
        status: 'success',
      });
      queryClient.invalidateQueries(Queries.CHORE_DETAILS);
    } catch {}
  };

  return (
    <Box
      borderRadius="8px"
      borderColor="gray.300"
      borderWidth="1px"
      padding="4"
      marginBottom="8"
      minWidth="460px"
    >
      <HStack marginBottom="4" justify="space-between">
        <HStack>
          <b>Wykonawca: </b>
          {chore.user ? (
            <UserDisplay user={chore.user} />
          ) : (
            <Text fontStyle="italic" color="gray.500">
              nie przypisano
            </Text>
          )}
        </HStack>
        {chore.user && (
          <Button
            variant="ghost"
            onClick={deleteAssignee}
            isLoading={mutation.isLoading}
            leftIcon={<BiX />}
          >
            Usuń
          </Button>
        )}
      </HStack>
      <Divider marginBottom="4" />
      <AddAssignee choreID={chore.id} />
    </Box>
  );
};
