import { FC } from 'react';
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { useAuth } from '../../store/auth/authHooks';
import { UserDTO } from '../../api/dto';
import { BiCalendar } from 'react-icons/all';

export const LogIn: FC = () => {
  const { logUserIn } = useAuth();

  const mockUser: UserDTO = { id: 2, email: 'uzytkownik@wp.pl', name: 'Użytkownik Testowy' };

  const logIn = () => {
    logUserIn(mockUser);
  };

  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh">
      <Box align="center" boxShadow="0 0 80px rgba(24, 38, 107, 0.1)" padding="16">
        <HStack spacing="2" marginBottom="8">
          <BiCalendar size="36px" />
          <Text fontSize="4xl" fontWeight="bold">
            Household Planner
          </Text>
        </HStack>
        <Button width="full" onClick={logIn} size="lg">
          Zaloguj się
        </Button>
      </Box>
    </Flex>
  );
};
