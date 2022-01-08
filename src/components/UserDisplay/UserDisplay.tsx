import { FC } from 'react';
import { UserDTO } from '../../api/dto';
import { Badge, HStack, Text } from '@chakra-ui/react';
import { useAuth } from '../../store/auth/authHooks';

export interface UserDisplayProps {
  user: UserDTO;
}

export const UserDisplay: FC<UserDisplayProps> = ({ user }) => {
  const auth = useAuth();

  const isCurrentUser = auth.user?.id === user.id;

  return (
    <HStack spacing="2">
      <Text>{user.name}</Text>
      {isCurrentUser && <Badge colorScheme="teal">Ja</Badge>}
      {user.isOwner && <Badge colorScheme="purple">Właściciel</Badge>}
    </HStack>
  );
};
