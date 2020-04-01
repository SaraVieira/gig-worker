import React from "react";
import Head from "next/head";
import { Box, Text } from "@chakra-ui/core";

const Home = () => (
  <Box width="1200" maxWidth="80%" margin="auto" marginTop={6}>
    <Head>
      <title>Gig Worker</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Text>Welcome to Gig Worker!</Text>
    </main>
  </Box>
);

export default Home;
