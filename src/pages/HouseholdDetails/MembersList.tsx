import { FC } from 'react';
import { Center, Spinner, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { MembersListItem } from './MembersListItem';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { memberService } from '../../api/services/MemberService';

export interface MembersListProps {
  householdID: number;
}

export const MembersList: FC<MembersListProps> = ({ householdID }) => {
  const { data, isLoading, isError } = useQuery([Queries.HOUSEHOLD_MEMBERS_LIST, householdID], () =>
    memberService.getHouseholdMembers(householdID),
  );

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError || !data) {
    return <Center>Podczas pobierania listy członków gospodarstwa domowego wystąpił błąd.</Center>;
  }

  if (data.length === 0) {
    return <Center>To gospodarstwo domowe nie ma żadnych członków.</Center>;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Imię i nazwisko</Th>
          <Th>Adres e-mail</Th>
          <Th isNumeric>Operacje</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((member) => (
          <MembersListItem key={member.id} member={member} householdID={householdID} />
        ))}
      </Tbody>
    </Table>
  );
};
