import { FC } from 'react';
import { useHistory, useParams } from 'react-router';
import { HOUSEHOLD_ID_PARAM, HouseholdDetailsParams, routes } from '../../routes';
import { Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { HouseholdDTO } from '../../api/dto';
import { BiEdit } from 'react-icons/all';

export const HouseholdDetails: FC = () => {
  const history = useHistory();
  const { householdID } = useParams<HouseholdDetailsParams>();

  const household: HouseholdDTO = {
    id: Number.parseInt(householdID),
    name: 'Gospodarstwo Testowe',
  };

  const redirectToHouseholdEditor = () => {
    history.push(routes.householdEditor.replace(`:${HOUSEHOLD_ID_PARAM}`, householdID));
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Text fontSize="4xl" fontStyle="italic">
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
          <Tab>Obowiązki domowe</Tab>
          <Tab>Członkowie</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>1</TabPanel>
          <TabPanel>2</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
