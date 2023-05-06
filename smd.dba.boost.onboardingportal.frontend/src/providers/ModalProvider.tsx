import { FC, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { ModalProps } from '../types/componentProps';

import CustomModal from '../components/common/Modal';

export const ModalProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalProps, setModalProps] = useState<ModalProps>({
    title: '',
    message: '',
    onConfirm: () => {},
    showCancelButton: true,
    onCancel: () => {},
    open: false,
  });

  const showModal = (modalProps: ModalProps) => {
    setModalProps({ ...modalProps, open: true });
  };

  const hideModal = () => {
    setModalProps((prevProps) => ({ ...prevProps, open: false }));
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      <CustomModal {...modalProps} />
      {children}
    </ModalContext.Provider>
  );
};
