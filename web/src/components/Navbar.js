import React from 'react'
import { Link, routes } from '@redwoodjs/router'
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/core'

import { useAuth0 } from '../react-auth0-spa'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
)

const NavBar = (props) => {
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0()
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

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
          <Link to={routes.home()}>Gig Worker</Link>
        </Heading>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
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
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Docs</MenuItems>
        <MenuItems>Examples</MenuItems>
        {isAuthenticated && (
          <MenuItems>
            <Link to={routes.profile()}>Profile</Link>
          </MenuItems>
        )}
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        {!isAuthenticated && (
          <Button
            onClick={() => loginWithRedirect({})}
            bg="transparent"
            border="1px"
          >
            Log In
          </Button>
        )}
        {isAuthenticated && (
          <>
            <Button bg="transparent" border="1px" onClick={() => logout()}>
              Log out
            </Button>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default NavBar
