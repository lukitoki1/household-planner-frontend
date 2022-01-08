import { FC, useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/all';
import { ChoresList } from './ChoresList';
import { routes } from '../../routes';
import { useHistory } from 'react-router';
import { ChoreFilters } from './ChoreFilters';
import { ChoreFilterParams } from '../../api/dto';

export interface HouseholdChoresProps {
  householdID: number;
}

export const HouseholdChores: FC<HouseholdChoresProps> = ({ householdID }) => {
  const history = useHistory();

  const [choreFilters, setChoreFilters] = useState<ChoreFilterParams>({});

  const redirectToChoreCreator = () => {
    history.push(routes.choreCreator, { householdID: householdID });
  };

  return (
    <>
      <Flex justify="space-between" align="center" marginBottom="8">
        <Text fontSize="2xl">Obowiązki gospodarstwa domowego</Text>
        <Button
          leftIcon={<BiPlus size="20px" />}
          onClick={redirectToChoreCreator}
          colorScheme="green"
        >
          Utwórz
        </Button>
      </Flex>
      <ChoreFilters
        onFiltersChange={(filters) => {
          setChoreFilters(filters);
        }}
      />
      <ChoresList householdID={householdID} filters={choreFilters} />
    </>
  );
};
