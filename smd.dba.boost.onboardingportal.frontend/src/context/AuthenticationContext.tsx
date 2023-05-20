import { createContext } from 'react';
import { AuthContextType } from '../types/contextTypes';

export const AuthenticationContext = createContext<AuthContextType>({
  isAuthenticated: false,
  role: '',
  token: '',
  username: '',
  SetAuthenticationState: () => {},
  RemoveAuthenticationState: () => {},
});
