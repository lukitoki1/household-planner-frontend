import {FC} from "react";
import {Box, Container, Flex} from "@chakra-ui/react";
import {NavBarUserMenu} from "./NavBarUserManu";
import {NavBarLogo} from "./NavBarLogo";

export const NavBar: FC = () => {
  return (
    <Box
      paddingY="28px"
      boxShadow="0 0 80px rgba(24, 38, 107, 0.1)"
      position="fixed"
      top="0"
      width="full"
      backgroundColor="white"
      zIndex="sticky"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between">
          <NavBarLogo/>
          <NavBarUserMenu/>
        </Flex>
      </Container>
    </Box>
  );
};