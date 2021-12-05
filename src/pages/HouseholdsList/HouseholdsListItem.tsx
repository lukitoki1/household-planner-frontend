import { FC } from 'react';
import { Button, HStack, Td, Tr } from '@chakra-ui/react';
import { BiChevronRight, BiTrash } from 'react-icons/all';
import { routes } from '../../routes';
import { useHistory } from 'react-router';
import { HouseholdDTO } from '../../api/dto';

export interface HouseholdsListItemProps {
  household: HouseholdDTO;
}

export const HouseholdsListItem: FC<HouseholdsListItemProps> = ({ household }) => {
  const history = useHistory();

  const redirectToHouseholdDetails = () => {
    history.push(routes.householdDetails.replace(':householdID', household.id.toString()));
  };

  const deleteHousehold = () => {
    console.log('deleting household...');
  };

  return (
    <Tr key={household.id}>
      <Td>{household.name}</Td>
      <Td isNumeric>
        <HStack spacing="2" justify="right">
          <Button onClick={deleteHousehold}>{<BiTrash />}</Button>
          <Button rightIcon={<BiChevronRight />} onClick={redirectToHouseholdDetails}>
            Otwórz
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};
