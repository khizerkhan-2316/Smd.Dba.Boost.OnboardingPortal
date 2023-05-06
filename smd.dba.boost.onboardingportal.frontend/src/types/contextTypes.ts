import { ModalProps } from './componentProps';

export type AuthContextType = {
  isAuthenticated: boolean;
  role: string;
  token: string;
  SetAuthenticationState: () => void;
  RemoveAuthenticationState: () => void;
};

export type LoadingContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export type ModalContextType = {
  showModal: (modalProps: ModalProps) => void;
  hideModal: () => void;
};
