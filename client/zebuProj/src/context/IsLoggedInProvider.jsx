import { createContext, useState } from 'react';

const IsLoggedInContext = createContext({});

// eslint-disable-next-line react/prop-types
export const IsLoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [permDeckId, setPermDeckId] = useState(null);
  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn, permDeckId, setPermDeckId }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

export default IsLoggedInContext;
