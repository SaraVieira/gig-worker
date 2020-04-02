import React, { FC, useContext } from "react";
import Link from "next/link";
import { Box, Heading, Flex, Text, Button, Grid } from "@chakra-ui/core";
import { useIntl } from "react-intl";

import { UserContext } from "./UserContext";
import { LanguageContext } from "./LanguageContext";

const MenuItems: FC = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const NavBar: FC = (props) => {
  const { messages } = useIntl();
  const { me } = useContext(UserContext);
  const { setLocale } = useContext(LanguageContext);
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      color="gray.600"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          <Link href="/">
            <a>Gig Worker</a>
          </Link>
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{messages["navbar.menu"]}</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        {me && (
          <MenuItems>
            <Link href="/profile">
              <a>{messages["navbar.profile"]}</a>
            </Link>
          </MenuItems>
        )}
      </Box>

      <Grid templateColumns="min-content min-content" columnGap={2}>
        <Box
          display={{ sm: show ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          {me ? (
            <Grid templateColumns="min-content min-content" columnGap={4}>
              <Link href="jobs/new">
                <Button variant="outline">
                  {messages["navbar.addYourself"]}
                </Button>
              </Link>
              <Link href="api/logout">
                <Button bg="transparent" border="1px">
                  {messages["navbar.logout"]}
                </Button>
              </Link>
            </Grid>
          ) : (
            <Link href="api/login">
              <Button bg="transparent" border="1px">
                {messages["navbar.login"]}
              </Button>
            </Link>
          )}
        </Box>
        <Grid templateColumns="min-content min-content" columnGap={2}>
          <Button fontSize={24} padding={0} onClick={() => setLocale("en")}>
            🇬🇧
          </Button>
          <Button fontSize={24} padding={0} onClick={() => setLocale("de")}>
            🇩🇪
          </Button>
        </Grid>
      </Grid>
    </Flex>
  );
};

export default NavBar;
