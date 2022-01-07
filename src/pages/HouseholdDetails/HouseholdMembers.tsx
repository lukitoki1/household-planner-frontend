import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { AddMember } from './AddMember';
import { MembersList } from './MembersList';

export interface HouseholdMembersProps {
  householdID: number;
}

export const HouseholdMembers: FC<HouseholdMembersProps> = ({ householdID }) => {
  return (
    <>
      <Text fontSize="2xl" marginBottom="8">
        Członkowie gospodarstwa domowego
      </Text>
      <AddMember householdID={householdID} />
      <MembersList householdID={householdID} />
    </>
  );
};
