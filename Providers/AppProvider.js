import { useEffect } from "react";
import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isTheFirst, setTheFirst] = useState(true);
  const [appLang, setAppLang] = useState("vi");
  const [tempUnit, setTempUnit] = useState("metric");
  const [followedCities, setFollowedCites] = useState(["ha noi", "thai binh"]);

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
        followedCities,
        setFollowedCites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
