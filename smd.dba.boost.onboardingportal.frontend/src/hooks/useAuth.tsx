import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';

export function useAuth() {
  return useContext(AuthenticationContext);
}
