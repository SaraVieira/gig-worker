import React from "react";
import NextApp from "next/app";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { NextPage } from "next";

import Navbar from "../components/Navbar";
import { UserContext } from "../components/UserContext";
import { User } from "../types";

type State = {
  user: User | null;
};

class App extends NextApp<NextPage, unknown, Readonly<State>> {
  state: Readonly<State> = {
    user: null,
  };

  componentDidMount() {
    fetch("/api/me")
      .then(function (response: Response) {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((user) => this.setState({ user }));
  }

  render() {
    const { Component } = this.props;
    return (
      <ThemeProvider>
        <CSSReset />
        <ColorModeProvider>
          <UserContext.Provider value={{ me: this.state.user }}>
            <Navbar {...this.props.pageProps} />
            <Component {...this.props.pageProps} />
          </UserContext.Provider>
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

export default App;
