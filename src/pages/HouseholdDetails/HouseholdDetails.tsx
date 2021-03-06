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
import { BiEdit } from 'react-icons/all';
import { replaceParam } from '../../helpers/url';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { householdService } from '../../api/services/HouseholdService';
import { HouseholdMembers } from './HouseholdMembers';
import { HouseholdChores } from './HouseholdChores';

export const HouseholdDetails: FC = () => {
  const history = useHistory();

  const { householdID } = useParams<HouseholdDetailsParams>();
  const id = Number.parseInt(householdID);

  const { data, isFetching, isError } = useQuery(Queries.HOUSEHOLD_DETAILS, () =>
    householdService.getHouseholdDetails(id),
  );

  const redirectToHouseholdEditor = () => {
    history.push(replaceParam(routes.householdEditor, HOUSEHOLD_ID_PARAM, householdID));
  };

  if (isFetching) {
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
          {data.name}
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
        Gospodarstwo #{data.id}
      </Text>
      <Tabs>
        <TabList>
          <Tab>Obowiązki</Tab>
          <Tab>Członkowie</Tab>
        </TabList>
        <TabPanels paddingTop="8">
          <TabPanel padding="0">
            <HouseholdChores householdID={id} />
          </TabPanel>
          <TabPanel padding="0">
            <HouseholdMembers householdID={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
