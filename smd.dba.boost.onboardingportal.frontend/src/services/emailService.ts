import axios from 'axios';
import {
  SEND_RESET_PASSWORD_MAIL_ENDPOINT,
  CLIENT_RESET_PASSWORD_URL,
} from '../utils/constants';

export async function sendResetPasswordEmail(email: string): Promise<void> {
  const requestBody = {
    recipientEmail: email,
    resetPasswordUrl: CLIENT_RESET_PASSWORD_URL,
  };

  try {
    await axios.post(SEND_RESET_PASSWORD_MAIL_ENDPOINT, requestBody);
  } catch (error) {}
}
