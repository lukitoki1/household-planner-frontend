import {FC} from "react";
import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {BiChevronDown, BiChevronUp, BiUserCircle} from "react-icons/all";
import {useHistory} from "react-router";
import {routes} from "../../routes";

export const NavBarUserMenu: FC = () => {
  const history = useHistory();

  const userName = "Testowy Użytkownik"

  const logout = () => {
    console.log("logging out...")
  }

  const redirectToSettings = () => {
    history.push(routes.settings)
  }

  return (
    <Menu matchWidth={true} placement="bottom-end">
      {({isOpen}) => (
        <>
          <MenuButton
            as={Button}
            rightIcon={isOpen ? <BiChevronUp size="20px"/> : <BiChevronDown size="20px"/>}
            leftIcon={<BiUserCircle size="20px"/>}
            variant="outline"
            padding="3"
          >
            {userName}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={redirectToSettings}>
              Ustawienia
            </MenuItem>
            <MenuItem onClick={logout}>
              Wyloguj
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}