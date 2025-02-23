"use client";

import React, { createContext, useContext, useState } from "react";
import { StorePopulated } from "../types/store/store";

type StoreContextType = {
  store: StorePopulated | null;
  setStore: React.Dispatch<React.SetStateAction<StorePopulated | null>>;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState<StorePopulated | null>(null);

  return (
    <StoreContext.Provider
      value={{
        store,
        setStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error("useStore must be used within an StoreProvider");
  }

  return context;
};
