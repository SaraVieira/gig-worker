import React from "react";
import NextApp from "next/app";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";

import Navbar from "../components/Navbar";

class App extends NextApp {
  render() {
    const { Component } = this.props;
    return (
      <ThemeProvider>
        <CSSReset />
        <ColorModeProvider>
          <Navbar {...this.props.pageProps} />
          <Component {...this.props.pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

export default App;
