import { FC } from 'react';
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
import { useHistory, useParams } from 'react-router';
import { CHORE_ID_PARAM, ChoreDetailsParams, routes } from '../../routes';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { choreService } from '../../api/services/ChoreService';
import { replaceParam } from '../../helpers/url';
import { ChoreInfo } from './ChoreInfo';
import { ChoreDescription } from './ChoreDescription';
import { ChorePhotos } from './ChorePhotos';

export const ChoreDetails: FC = () => {
  const history = useHistory();

  const { choreID } = useParams<ChoreDetailsParams>();
  const id = parseInt(choreID);

  const { data, isFetching, isError } = useQuery(Queries.CHORE_DETAILS, () =>
    choreService.getChoreDetails(id),
  );

  const redirectToChoreEditor = () => {
    history.push(replaceParam(routes.choreEditor, CHORE_ID_PARAM, choreID));
  };

  if (isFetching) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError || !data) {
    return <Center>Podczas pobierania szczegółów obowiązku domowego wystąpił błąd.</Center>;
  }

  return (
    <>
      <Flex justify="space-between" align="center">
        <Text fontSize="4xl" color="blue.600">
          {data.name}
        </Text>
        <Button
          leftIcon={<BiEdit size="20px" />}
          onClick={redirectToChoreEditor}
          colorScheme="blue"
        >
          Edytuj
        </Button>
      </Flex>
      <Text paddingLeft="1" fontSize="md" color="gray.500" marginBottom="8">
        Obowiązek domowy #{data.id}
      </Text>
      <Tabs>
        <TabList>
          <Tab>Informacje</Tab>
          <Tab>Opis</Tab>
          <Tab>Zdjęcia</Tab>
        </TabList>
        <TabPanels paddingTop="8">
          <TabPanel padding="0">
            <ChoreInfo chore={data} />
          </TabPanel>
          <TabPanel padding="0">
            <ChoreDescription chore={data} />
          </TabPanel>
          <TabPanel padding="0">
            <ChorePhotos choreID={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
