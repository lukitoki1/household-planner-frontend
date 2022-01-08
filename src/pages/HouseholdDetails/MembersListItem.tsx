import { FC } from 'react';
import { UserDTO } from '../../api/dto';
import { Button, HStack, Td, Tr } from '@chakra-ui/react';
import { BiUserX } from 'react-icons/all';
import { useMutation } from 'react-query';
import { queryClient } from '../../api/queryClient';
import { Queries } from '../../api/queries';
import { useAppToast } from '../../components/Toast/useToast';
import { memberService } from '../../api/services/MemberService';
import { UserDisplay } from '../../components/UserDisplay/UserDisplay';

export interface MembersListItemProps {
  member: UserDTO;
  householdID: number;
}

export const MembersListItem: FC<MembersListItemProps> = ({ member, householdID }) => {
  const mutation = useMutation(() => memberService.deleteHouseholdMember(householdID, member.id));
  const { triggerToast } = useAppToast();

  const deleteMember = async () => {
    try {
      await mutation.mutateAsync();
      triggerToast({
        title: 'Usunięto członka gospodarstwa',
        description: `Pomyślnie usunięto członka gospodarstwa domowego: "${member.name}"`,
        status: 'success',
      });
      await queryClient.invalidateQueries(Queries.HOUSEHOLD_MEMBERS_LIST);
    } catch {}
  };

  return (
    <Tr key={member.id}>
      <Td>
        <UserDisplay user={member} />
      </Td>
      <Td>{member.email}</Td>
      <Td isNumeric>
        <HStack spacing="2" justify="right">
          <Button onClick={deleteMember} leftIcon={<BiUserX />}>
            Usuń
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};
