import React, { FC, useState, useEffect } from "react";
import { AppProps } from "next/app";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";

import Navbar from "../components/Navbar";
import { UserContext } from "../components/UserContext";
import { User } from "../types";
import { IntlProvider } from "react-intl";
import { messages } from "../i18n";
import { LanguageContext } from "../components/LanguageContext";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [me, setMe] = useState<User | null>(null);
  const [locale, setLocale] = useState<"en" | "de">("en");

  useEffect(() => {
    fetch("/api/me")
      .then(function (response: Response) {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((me) => setMe(me));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (["en", "de"].includes(navigator.language)) {
      setLocale(navigator.language as "en" | "de");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <LanguageContext.Provider value={{ locale, setLocale }}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <UserContext.Provider value={{ me }}>
            <Navbar {...pageProps} />
            <Component {...pageProps} />
          </UserContext.Provider>
        </IntlProvider>
      </LanguageContext.Provider>
    </ThemeProvider>
  );
};

export default App;
