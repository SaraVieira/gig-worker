import React from "react";
import Head from "next/head";
import { Box, Text } from "@chakra-ui/core";
import { useIntl } from "react-intl";

const Home = () => {
  const { messages } = useIntl();

  return (
    <Box width="1200" maxWidth="80%" margin="auto" marginTop={6}>
      <Head>
        <title>Gig Worker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text>{messages["welcomeToGigWorker"]}</Text>
      </main>
    </Box>
  );
};

export default Home;
