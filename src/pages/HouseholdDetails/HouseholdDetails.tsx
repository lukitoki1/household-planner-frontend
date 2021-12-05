import { FC } from 'react';
import { useHistory, useParams } from 'react-router';
import { HOUSEHOLD_ID_PARAM, HouseholdDetailsParams, routes } from '../../routes';
import { Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { HouseholdDTO } from '../../api/dto';
import { BiEdit } from 'react-icons/all';
import { replaceParam } from '../../helpers/url';
import { ChoresList } from './ChoresList';
import { MembersList } from './MembersList';

export const HouseholdDetails: FC = () => {
  const history = useHistory();
  const { householdID } = useParams<HouseholdDetailsParams>();

  const id = Number.parseInt(householdID);

  const household: HouseholdDTO = {
    id,
    name: 'Gospodarstwo Testowe',
  };

  const redirectToHouseholdEditor = () => {
    history.push(replaceParam(routes.householdEditor, HOUSEHOLD_ID_PARAM, householdID));
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Text fontSize="4xl" fontStyle="italic" color="blue.600">
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
