import { useState } from 'react';
import { CardActions } from '@mui/material';
import { EmailOutlined, LockOutlined } from '@mui/icons-material';

import BaseTextField from '../common/BaseTextField';
import BaseButton from '../common/BaseButton';

import { LoginFormProps } from '../../types/authenticationProps';

import {
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
} from '../../utils/formUtils';

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);
  const [isPasswordInputTouched, setIsPasswordInputTouched] = useState(false);

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, isEmailValid && isPasswordValid, onSubmit)
      }
    >
      <BaseTextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) =>
          handleEmailChange(e, setEmail, setIsEmailValid, isEmailInputTouched)
        }
        onFocus={() => setIsEmailInputTouched(true)}
        fullWidth
        margin="normal"
        required
        error={!isEmailValid && isEmailInputTouched}
        endAdornment={<EmailOutlined />}
      />
      <BaseTextField
        label="Adgangskode"
        type="password"
        value={password}
        onChange={(e) =>
          handlePasswordChange(
            e,
            setPassword,
            setIsPasswordValid,
            isPasswordInputTouched
          )
        }
        onFocus={() => setIsPasswordInputTouched(true)}
        fullWidth
        margin="normal"
        required
        error={!isPasswordValid && isPasswordInputTouched}
        endAdornment={<LockOutlined />}
      />
      <CardActions style={{ justifyContent: 'center' }}>
        <BaseButton disabled={!isEmailValid || !isPasswordValid}>
          Login
        </BaseButton>
      </CardActions>
    </form>
  );
};

export default LoginForm;
