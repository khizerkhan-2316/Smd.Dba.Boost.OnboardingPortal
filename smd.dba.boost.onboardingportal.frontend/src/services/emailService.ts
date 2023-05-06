import axios from 'axios';
import {
  SEND_RESET_PASSWORD_MAIL_ENDPOINT,
  CLIENT_RESET_PASSWORD_URL,
} from '../utils/constants';

export async function sendResetPasswordEmail(email: string): Promise<void> {
  const resetPasswordUrl = SEND_RESET_PASSWORD_MAIL_ENDPOINT;
  const requestBody = {
    recipientEmail: email,
    resetPasswordUrl: resetPasswordUrl,
  };

  try {
    await axios.post(CLIENT_RESET_PASSWORD_URL, requestBody);
  } catch (error) {}
}
