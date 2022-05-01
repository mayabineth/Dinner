import React, { useState, useContext } from "react";
import { createTheme } from "@material-ui/core/styles";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <AppContext.Provider value={{ theme, darkMode, setDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
