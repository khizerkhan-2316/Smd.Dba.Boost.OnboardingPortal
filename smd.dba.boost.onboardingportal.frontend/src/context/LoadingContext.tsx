import { createContext } from 'react';
import { LoadingContextType } from '../types/contextTypes';

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});
