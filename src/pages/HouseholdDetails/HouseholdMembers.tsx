import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { NewMember } from './NewMember';
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
      <NewMember householdID={householdID} />
      <MembersList householdID={householdID} />
    </>
  );
};
