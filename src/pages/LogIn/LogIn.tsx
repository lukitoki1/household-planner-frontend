import { FC } from 'react';
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { BiCalendar } from 'react-icons/all';
import FirebaseService from '../../api/services/FirebaseService';
import { useAuth } from '../../store/auth/authHooks';

export const LogIn: FC = () => {
  const { isAuthLoading, setAuthLoading } = useAuth();

  const logIn = () => {
    setAuthLoading(true);
    FirebaseService.loginWithGoogle();
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
        <Button width="full" onClick={logIn} size="lg" isLoading={isAuthLoading}>
          Zaloguj się
        </Button>
      </Box>
    </Flex>
  );
};
