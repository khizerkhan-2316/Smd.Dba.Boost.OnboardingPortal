import axios, { AxiosResponse } from 'axios';
import {
  LOGIN_ENDPOINT,
  RESET_PASSWORD_ENDPOINT,
  VERIFY_TOKEN_ENDPOINT,
} from '../utils/constants';

import { LoginRequestData } from '../types/request/authenticationRequestData';
import {
  LoginResponseData,
  VerifyTokenResponse,
} from '../types/response/authenticationResponseData';

export async function authenticateUser(
  loginData: LoginRequestData
): Promise<LoginResponseData> {
  try {
    const response: AxiosResponse<LoginResponseData> = await axios.post(
      LOGIN_ENDPOINT,
      loginData
    );
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error: any) {
    throw new Error(`Login mislykkedes : ${error.message}`);
  }
}

export async function resetPassword(
  token: string,
  password: string
): Promise<void> {
  const url = RESET_PASSWORD_ENDPOINT;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    password,
  };
  await axios.post(url, data, config);
}

export async function validateToken(
  token: string
): Promise<VerifyTokenResponse> {
  try {
    const response: AxiosResponse<VerifyTokenResponse> = await axios.post(
      VERIFY_TOKEN_ENDPOINT,
      { token: token }
    );

    console.log('TOKEN ENDPOINT', VERIFY_TOKEN_ENDPOINT);
    return response.data;
  } catch (error) {
    throw error;
  }
}
