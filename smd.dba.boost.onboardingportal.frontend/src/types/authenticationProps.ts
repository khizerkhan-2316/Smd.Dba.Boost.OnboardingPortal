export type LoginFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>;
};

export type ResetPasswordMailFormProps = {
  onSubmit: (email: string) => Promise<void>;
};

export type ResetPasswordFormProps = {
  onSubmit: (password: string) => Promise<void>;
};

export type AuthenticationProviderProps = {
  children: React.ReactNode;
};
