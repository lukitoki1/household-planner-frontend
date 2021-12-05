import { FC } from 'react';
import { Button, Flex, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { choreMocks } from './mocks';
import { ChoresListItem } from './ChoresListItem';
import { BiPlus } from 'react-icons/all';
import { useHistory } from 'react-router';
import { routes } from '../../routes';

export interface ChoresListProps {
  householdID: number;
}

export const ChoresList: FC<ChoresListProps> = ({ householdID }) => {
  const history = useHistory();

  const redirectToChoreCreator = () => {
    history.push(routes.choreCreator);
  };

  return (
    <>
      <Flex justify="space-between" align="center" marginBottom="8">
        <Text fontSize="2xl">Nadchodzące obowiązki domowe</Text>
        <Button
          leftIcon={<BiPlus size="20px" />}
          onClick={redirectToChoreCreator}
          colorScheme="green"
        >
          Utwórz
        </Button>
      </Flex>
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
          {choreMocks.map((chore) => (
            <ChoresListItem key={chore.id} chore={chore} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};
