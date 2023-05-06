import { createContext } from 'react';
import { ModalContextType } from '../types/contextTypes';

export const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  hideModal: () => {},
});
