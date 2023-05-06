export type LoginResponseData = {
  token: string;
  refreshToken: string;
  role: string;
};

export type VerifyTokenResponse = {
  isValid: boolean;
  message?: string;
};
