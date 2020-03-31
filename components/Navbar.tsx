import React, { useEffect, FC } from "react";
import Link from "next/link";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import fetch, { Response } from "node-fetch";

const MenuItems: FC = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const NavBar: FC = (props) => {
  const [user, setUser] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  useEffect(() => {
    fetch("/api/me")
      .then(function (response: Response) {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then(setUser);
  }, []);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
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
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Docs</MenuItems>
        <MenuItems>Examples</MenuItems>
        {user && (
          <MenuItems>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </MenuItems>
        )}
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {!user && (
          <Button bg="transparent" border="1px">
            <Link href="api/login">
              <a>Log In</a>
            </Link>
          </Button>
        )}

        {user && (
          <>
            <Button bg="transparent" border="1px">
              <Link href="api/logout">
                <a>Log out</a>
              </Link>
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};
export async function getServerSideProps() {
  // const res = await fetch('/api/session').then((r) => r.json())

  // console.log(res)

  return {
    props: { user: "LOL" },
  };
}
export default NavBar;
