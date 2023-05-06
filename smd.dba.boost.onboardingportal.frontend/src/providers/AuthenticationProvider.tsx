import React, { useState } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';

import { AuthenticationProviderProps } from '../types/authenticationProps';

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');

  const SetAuthenticationState = () => {
    const role = localStorage.getItem('role') || '';
    const token = localStorage.getItem('token') || '';

    setRole(role);
    setToken(token);
    setIsAuthenticated(true);
  };

  const RemoveAuthenticationState = () => {
    setRole('');
    setToken('');
    setIsAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
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
