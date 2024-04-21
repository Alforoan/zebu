import { createContext, useState } from 'react';

const IsLoggedInContext = createContext({});

// eslint-disable-next-line react/prop-types
export const IsLoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deckId, setDeckId] = useState('');
  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn, deckId, setDeckId }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

export default IsLoggedInContext;
