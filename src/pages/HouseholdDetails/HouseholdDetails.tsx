import { FC } from 'react';
import { useHistory, useParams } from 'react-router';
import { HOUSEHOLD_ID_PARAM, HouseholdDetailsParams, routes } from '../../routes';
import {
  Button,
  Center,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { HouseholdDTO } from '../../api/dto';
import { BiEdit } from 'react-icons/all';
import { replaceParam } from '../../helpers/url';
import { ChoresList } from './ChoresList';
import { MembersList } from './MembersList';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { householdService } from '../../api/services/HouseholdService';

export const HouseholdDetails: FC = () => {
  const history = useHistory();

  const { householdID } = useParams<HouseholdDetailsParams>();
  const id = Number.parseInt(householdID);

  const { data, isLoading, isError } = useQuery(Queries.HOUSEHOLD_DETAILS, () =>
    householdService.getHouseholdDetails(id),
  );

  const household: HouseholdDTO = {
    id,
    name: 'Gospodarstwo Testowe',
  };

  const redirectToHouseholdEditor = () => {
    history.push(replaceParam(routes.householdEditor, HOUSEHOLD_ID_PARAM, householdID));
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError || !data) {
    return <Center>Podczas pobierania szczegółów gospodarsta domowego wystąpił błąd.</Center>;
  }

  return (
    <>
      <Flex justify="space-between" align="center">
        <Text fontSize="4xl" color="blue.600">
          {household.name}
        </Text>
        <Button
          leftIcon={<BiEdit size="20px" />}
          onClick={redirectToHouseholdEditor}
          colorScheme="blue"
        >
          Edytuj
        </Button>
      </Flex>
      <Text paddingLeft="1" fontSize="md" color="gray.500" marginBottom="8">
        Gospodarstwo #{household.id}
      </Text>
      <Tabs>
        <TabList>
          <Tab>Obowiązki</Tab>
          <Tab>Członkowie</Tab>
        </TabList>
        <TabPanels paddingTop="8">
          <TabPanel padding="0">
            <ChoresList householdID={id} />
          </TabPanel>
          <TabPanel padding="0">
            <MembersList householdID={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
