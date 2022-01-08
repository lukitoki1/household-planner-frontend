import { FC } from 'react';
import { Center, Spinner, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { ChoresListItem } from './ChoresListItem';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { choreService } from '../../api/services/ChoreService';
import { ChoreFilterParams } from '../../api/dto';

export interface ChoresListProps {
  householdID: number;
  filters: ChoreFilterParams;
}

export const ChoresList: FC<ChoresListProps> = ({ householdID, filters }) => {
  const { data, isFetching, isError } = useQuery(
    [Queries.HOUSEHOLD_CHORES_LIST, householdID, filters],
    () => choreService.getHouseholdChores(householdID, filters),
  );

  if (isFetching) {
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
    return (
      <Center>
        To gospodarstwo domowe nie posiada żadnych obowiązków lub żadne wyniki nie spełniają
        kryteriów filtrowania.
      </Center>
    );
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nazwa</Th>
          <Th>Wykonawca</Th>
          <Th>Następne wystąpienie</Th>
          <Th>Interwał</Th>
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
