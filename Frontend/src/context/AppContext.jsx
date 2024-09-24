import React, { createContext, useState, useContext } from 'react';
 
const AppContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState('');
  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn,location, setLocation}}>
      {children}
    </AppContext.Provider>
  );
}
 
export default function useAppContext() {
  return useContext(AppContext);
}
