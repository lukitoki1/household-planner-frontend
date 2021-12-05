import { FC } from 'react';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BiChevronDown, BiChevronUp, BiUserCircle } from 'react-icons/all';

export const NavBarUserMenu: FC = () => {
  const userName = 'Testowy Użytkownik';

  const logout = () => {
    console.log('logging out...');
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
            {userName}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logout}>Wyloguj</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
