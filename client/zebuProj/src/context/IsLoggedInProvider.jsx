import { createContext, useState } from 'react';

const IsLoggedInContext = createContext({});

// eslint-disable-next-line react/prop-types
export const IsLoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

export default IsLoggedInContext;
