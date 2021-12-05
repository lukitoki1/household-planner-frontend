import { FC } from 'react';
import { useHistory, useParams } from 'react-router';
import { HouseholdDetailsParams, routes } from '../../routes';
import { Button, Flex, Text } from '@chakra-ui/react';
import { HouseholdDTO } from '../../api/dto';
import { BiEdit } from 'react-icons/all';

export const HouseholdDetails: FC = () => {
  const history = useHistory();
  const { householdID } = useParams<HouseholdDetailsParams>();

  const household: HouseholdDTO = {
    id: Number.parseInt(householdID),
    name: 'Gospodarstwo Testowe',
  };

  const redirectToHouseholdCreator = () => {
    history.push(routes.householdCreator);
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Text fontSize="4xl" fontStyle="italic">
          {household.name}
        </Text>
        <Button
          leftIcon={<BiEdit size="20px" />}
          onClick={redirectToHouseholdCreator}
          colorScheme="blue"
        >
          Edytuj
        </Button>
      </Flex>
      <Text paddingLeft="1" fontSize="md" color="gray.500" marginBottom="8">
        ID: {household.id}
      </Text>
    </>
  );
};
