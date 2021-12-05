import { FC } from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { routes } from '../../routes';
import { BiCalendar } from 'react-icons/all';

export const NavBarLogo: FC = () => {
  const history = useHistory();

  const redirectToDefault = () => {
    history.push(routes.default);
  };

  return (
    <HStack spacing="2">
      <BiCalendar size="24px" />
      <Text as="button" onClick={redirectToDefault} fontSize="2xl" fontWeight="bold">
        Household Planner
      </Text>
    </HStack>
  );
};
