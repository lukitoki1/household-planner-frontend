import { FC } from 'react';
import { Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { memberMocks } from './mocks';
import { MembersListItem } from './MembersListItem';

export interface MembersListProps {
  householdID: number;
}

export const MembersList: FC<MembersListProps> = ({ householdID }) => {
  return (
    <>
      <Text fontSize="2xl" marginBottom="8">
        Członkowie gospodarstwa domowego
      </Text>
      <Table>
        <Thead>
          <Tr>
            <Th>Imię i nazwisko</Th>
            <Th>Adres e-mail</Th>
            <Th isNumeric>Operacje</Th>
          </Tr>
        </Thead>
        <Tbody>
          {memberMocks.map((member) => (
            <MembersListItem key={member.id} member={member} householdID={householdID} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};
