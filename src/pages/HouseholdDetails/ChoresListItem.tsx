import { FC } from 'react';
import { Button, HStack, Td, Tr, Text } from '@chakra-ui/react';
import { BiChevronRight, BiTrash } from 'react-icons/all';
import { ChoreDTO } from '../../api/dto';
import { useHistory } from 'react-router';
import { CHORE_ID_PARAM, routes } from '../../routes';
import { replaceParam } from '../../helpers/url';
import { formatDateTime } from '../../helpers/time';
import { useMutation } from 'react-query';
import { choreService } from '../../api/services/ChoreService';
import { useAppToast } from '../../components/Toast/useToast';
import { queryClient } from '../../api/queryClient';
import { Queries } from '../../api/queries';

export interface ChoresListItemProps {
  chore: ChoreDTO;
}

export const ChoresListItem: FC<ChoresListItemProps> = ({ chore }) => {
  const history = useHistory();
  const { triggerToast } = useAppToast();

  const mutation = useMutation(() => choreService.deleteChore(chore.id));

  const deleteChore = async () => {
    try {
      await mutation.mutateAsync();
      triggerToast({
        title: 'Usunięto obowiązek domowy',
        description: `Pomyślnie usunięto obowiązek domowy "${chore.name}"`,
        status: 'success',
      });
      await queryClient.invalidateQueries(Queries.CHORES_LIST);
    } catch {}
  };

  const redirectToChoreDetails = () => {
    history.push(replaceParam(routes.choreDetails, CHORE_ID_PARAM, chore.id.toString()));
  };

  return (
    <Tr key={chore.id}>
      <Td>{chore.name}</Td>
      <Td>
        {chore.user ? (
          chore.user.name
        ) : (
          <Text fontStyle="italic" color="gray.500">
            nie przypisano
          </Text>
        )}
      </Td>
      <Td>{formatDateTime(new Date(chore.nextOccurrenceDate))}</Td>
      <Td isNumeric>
        <HStack spacing="2" justify="right">
          <Button onClick={deleteChore}>{<BiTrash />}</Button>
          <Button rightIcon={<BiChevronRight />} onClick={redirectToChoreDetails}>
            Szczegóły
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};
