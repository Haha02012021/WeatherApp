import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isTheFirst, setTheFirst] = useState(true);
  return (
    <AppContext.Provider value={{ isTheFirst, setTheFirst }}>
      {children}
    </AppContext.Provider>
  );
}
