import { FC } from 'react';
import { Button, Flex, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/all';
import { useHistory } from 'react-router';
import { routes } from '../../routes';
import { householdMocks } from './mocks';
import { HouseholdsListItem } from './HouseholdsListItem';

export const HouseholdsList: FC = () => {
  const history = useHistory();

  const redirectToHouseholdCreator = () => {
    history.push(routes.householdCreator);
  };

  return (
    <>
      <Flex justify="space-between" align="center" marginBottom="8">
        <Text fontSize="4xl">Twoje gospodarstwa domowe</Text>
        <Button
          leftIcon={<BiPlus size="20px" />}
          onClick={redirectToHouseholdCreator}
          colorScheme="green"
        >
          Utwórz
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nazwa</Th>
            <Th isNumeric>Operacje</Th>
          </Tr>
        </Thead>
        <Tbody>
          {householdMocks.map((household) => (
            <HouseholdsListItem key={household.id} household={household} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};
