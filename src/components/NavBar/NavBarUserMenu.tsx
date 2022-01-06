import { FC } from 'react';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BiChevronDown, BiChevronUp, BiUserCircle } from 'react-icons/all';
import { useAuth } from '../../store/auth/authHooks';
import FirebaseService from '../../api/services/FirebaseService';
import { useAppToast } from '../Toast/useToast';
import { useHistory } from 'react-router';
import { routes } from '../../routes';

export const NavBarUserMenu: FC = () => {
  const history = useHistory();

  const { user, clearUser } = useAuth();
  const { triggerToast } = useAppToast();

  const editUser = () => {
    history.push(routes.userEditor);
  };

  const logout = () => {
    FirebaseService.logout()
      .then(() => {
        clearUser();

        triggerToast({
          title: 'Nastąpiło wylogowanie',
          description: `Pomyślnie wylogowano użytkownika.`,
          status: 'success',
        });
      })
      .catch((reason) => {
        console.error('User not logged in');
        console.log(reason);

        triggerToast({
          title: 'Błąd wylogowania',
          description: `Podczas wylogowywania wystąpił błąd. Spróbuj ponownie`,
          status: 'error',
        });
      });
    clearUser();
  };

  return (
    <Menu matchWidth={true} placement="bottom-end">
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            rightIcon={isOpen ? <BiChevronUp size="20px" /> : <BiChevronDown size="20px" />}
            leftIcon={<BiUserCircle size="20px" />}
            variant="outline"
            padding="3"
          >
            {user?.name}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={editUser}>Edytuj konto</MenuItem>
            <MenuItem onClick={logout}>Wyloguj</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
