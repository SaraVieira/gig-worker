import { createContext } from "react";

export type AllowedLanguages = "en" | "de";

export const LanguageContext = createContext<{
  locale: AllowedLanguages;
  setLocale: (newLocale: AllowedLanguages) => void;
}>({ locale: "en", setLocale: () => {} });
