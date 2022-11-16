import { useEffect } from "react";
import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isTheFirst, setTheFirst] = useState(true);
  const [appLang, setAppLang] = useState("vi");
  const [tempUnit, setTempUnit] = useState("C");

  useEffect(() => {}, []);

  return (
    <AppContext.Provider
      value={{
        isTheFirst,
        setTheFirst,
        appLang,
        setAppLang,
        tempUnit,
        setTempUnit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
