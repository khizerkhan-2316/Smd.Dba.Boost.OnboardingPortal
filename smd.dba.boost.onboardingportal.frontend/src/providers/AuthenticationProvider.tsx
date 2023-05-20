import React, { useState } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';

import { AuthenticationProviderProps } from '../types/authenticationProps';
import { LocalStorageKey } from '../Enums/localStorageKeys';

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const SetAuthenticationState = () => {
    const role = localStorage.getItem(LocalStorageKey.ROLE) || '';
    const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) || '';
    const username = localStorage.getItem(LocalStorageKey.USERNAME) || '';

    setRole(role);
    setToken(token);
    setUsername(username);
    setIsAuthenticated(true);
  };

  const RemoveAuthenticationState = () => {
    localStorage.removeItem(LocalStorageKey.ROLE);
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageKey.USERNAME);

    setRole('');
    setToken('');
    setUsername('');
    setIsAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        username,
        role,
        token,
        SetAuthenticationState: SetAuthenticationState,
        RemoveAuthenticationState: RemoveAuthenticationState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
