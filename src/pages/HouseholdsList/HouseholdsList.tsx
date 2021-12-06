import { FC } from 'react';
import { Button, Center, Flex, Spinner, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/all';
import { useHistory } from 'react-router';
import { routes } from '../../routes';
import { HouseholdsListItem } from './HouseholdsListItem';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { householdService } from '../../api/services/HouseholdService';

export const HouseholdsList: FC = () => {
  const history = useHistory();

  const { data, isLoading, isError } = useQuery(
    Queries.HOUSEHOLDS_LIST,
    householdService.getHouseholdsList,
  );

  const redirectToHouseholdCreator = () => {
    history.push(routes.householdCreator);
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError || !data) {
    return <Center>Podczas pobierania listy gospodarstw domowych wystąpił błąd.</Center>;
  }

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
          {data.map((household) => (
            <HouseholdsListItem key={household.id} household={household} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};
