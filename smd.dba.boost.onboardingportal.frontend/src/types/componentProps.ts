export type BaseTextFieldProps = {
  label: string;
  type: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;
};

export type LinkProps = {
  to: string;
  children: React.ReactNode;
};

export type ModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  showCancelButton?: boolean;
  onCancel?: () => void;
  open: boolean;
};
