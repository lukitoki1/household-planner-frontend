import { FC } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/all';
import { ChoresList } from './ChoresList';
import { routes } from '../../routes';
import { useHistory } from 'react-router';

export interface HouseholdChoresProps {
  householdID: number;
}

export const HouseholdChores: FC<HouseholdChoresProps> = ({ householdID }) => {
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
      <ChoresList householdID={householdID} />
    </>
  );
};
