import {FC} from "react";
import {Center, Text} from "@chakra-ui/react";
import {useHistory} from "react-router";
import {routes} from "../../routes";

export const NavBarLogo: FC = () => {
  const history = useHistory();

  const redirectToDefault = () => {
    history.push(routes.default)
  }

  return (
    <Center>
      <Text as="button" onClick={redirectToDefault} fontSize="3xl" fontWeight="bold">Household Planner</Text>
    </Center>
  )
}