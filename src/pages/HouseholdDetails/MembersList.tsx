import { FC } from 'react';
import { Center, Spinner, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { MembersListItem } from './MembersListItem';
import { NewMember } from './NewMember';
import { useQuery } from 'react-query';
import { Queries } from '../../api/queries';
import { memberService } from '../../api/services/MemberService';

export interface MembersListProps {
  householdID: number;
}

export const MembersList: FC<MembersListProps> = ({ householdID }) => {
  const { data, isLoading, isError } = useQuery(Queries.MEMBERS_LIST, () =>
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

  return (
    <>
      <Text fontSize="2xl" marginBottom="8">
        Członkowie gospodarstwa domowego
      </Text>
      <NewMember householdID={householdID} />
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
    </>
  );
};
