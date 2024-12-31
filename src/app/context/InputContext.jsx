import React, { useState, createContext } from "react";

export const InputContext = createContext();

export default function InputProvider({ children }) {
  const [value, setValue] = useState([]);

  return (
    <InputContext.Provider value={{ value, setValue }}>
      {children}
    </InputContext.Provider>
  );
}
