import { FC } from 'react';
import { Button, HStack, Td, Tr } from '@chakra-ui/react';
import { BiChevronRight, BiTrash } from 'react-icons/all';
import { HOUSEHOLD_ID_PARAM, routes } from '../../routes';
import { useHistory } from 'react-router';
import { HouseholdDTO } from '../../api/dto';
import { useMutation, useQueryClient } from 'react-query';
import { householdService } from '../../api/services/HouseholdService';
import { useAppToast } from '../../components/Toast/useToast';
import { Queries } from '../../api/queries';
import { replaceParam } from '../../helpers/url';

export interface HouseholdsListItemProps {
  household: HouseholdDTO;
}

export const HouseholdsListItem: FC<HouseholdsListItemProps> = ({ household }) => {
  const history = useHistory();
  const { triggerToast } = useAppToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(() => householdService.deleteHousehold(household.id));

  const redirectToHouseholdDetails = () => {
    history.push(
      replaceParam(routes.householdDetails, HOUSEHOLD_ID_PARAM, household.id.toString()),
    );
  };

  const deleteHousehold = async () => {
    try {
      await mutation.mutateAsync();
      triggerToast({
        title: 'Usunięto gospodarstwo domowe',
        description: `Pomyślnie usunięto gospodarstwo domowe "${household.name}"`,
        status: 'success',
      });
      await queryClient.invalidateQueries(Queries.HOUSEHOLDS_LIST);
    } catch {}
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
