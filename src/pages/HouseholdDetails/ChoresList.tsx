import { FC } from 'react';
import { Button, Center, Flex, Spinner, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { ChoresListItem } from './ChoresListItem';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { choreService } from '../../api/services/ChoreService';

export interface ChoresListProps {
  householdID: number;
}

export const ChoresList: FC<ChoresListProps> = ({ householdID }) => {
  const { data, isLoading, isError } = useQuery(Queries.CHORES_LIST, () =>
    choreService.getHouseholdChores(householdID),
  );

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError || !data) {
    return <Center>Podczas pobierania listy obowiązków domowych wystąpił błąd.</Center>;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nazwa</Th>
          <Th>Wykonawca</Th>
          <Th>Data następnego wykonania</Th>
          <Th isNumeric>Operacje</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((chore) => (
          <ChoresListItem key={chore.id} chore={chore} />
        ))}
      </Tbody>
    </Table>
  );
};
