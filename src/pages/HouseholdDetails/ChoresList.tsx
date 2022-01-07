import { FC } from 'react';
import { Center, Spinner, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { ChoresListItem } from './ChoresListItem';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { choreService } from '../../api/services/ChoreService';

export interface ChoresListProps {
  householdID: number;
}

export const ChoresList: FC<ChoresListProps> = ({ householdID }) => {
  const { data, isLoading, isError } = useQuery([Queries.CHORES_LIST, householdID], () =>
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

  if (data.length === 0) {
    return <Center>To gospodarstwo domowe nie posiada żadnych obowiązków.</Center>;
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
