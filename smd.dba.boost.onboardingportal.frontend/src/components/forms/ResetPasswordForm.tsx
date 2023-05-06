import { useState } from 'react';
import { CardActions } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { handlePasswordChange, handleSubmit } from '../../utils/formUtils';
import { ResetPasswordFormProps } from '../../types/authenticationProps';

import BaseTextField from '../common/BaseTextField';
import BaseButton from '../common/BaseButton';

const ResetPasswordForm = ({ onSubmit }: ResetPasswordFormProps) => {
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordInputTouched, setIsPasswordInputTouched] = useState(false);

  return (
    <form onSubmit={(e) => handleSubmit(e, isPasswordValid, onSubmit)}>
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
        error={!isPasswordValid && isPasswordInputTouched}
        required
        fullWidth
        margin="normal"
        endAdornment={<LockOutlined />}
        onFocus={() => setIsPasswordInputTouched(true)}
      />
      <CardActions>
        <BaseButton disabled={!isPasswordValid}>Reset password</BaseButton>
      </CardActions>
    </form>
  );
};

export default ResetPasswordForm;
