import React, { createContext, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const currency = "₹";
  const addToCartDelay = 3000;
  return (
    <AppContext.Provider value={{ currency, addToCartDelay }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);