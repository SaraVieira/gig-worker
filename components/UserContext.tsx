import { createContext } from "react";

import { User } from "../types";

export const UserContext = createContext<{ me: User | null }>({ me: null });
