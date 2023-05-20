import { useState } from 'react';
import { CardActions } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';

import { handleEmailChange, handleSubmit } from '../../utils/formUtils';
import { ResetPasswordMailFormProps } from '../../types/authenticationProps';

import BaseTextField from '../common/BaseTextField';
import BaseButton from '../common/BaseButton';

const ResetPasswordMailForm = ({ onSubmit }: ResetPasswordMailFormProps) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);

  return (
    <form onSubmit={(e) => handleSubmit(e, isEmailValid, () => onSubmit(email))}>
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

      <CardActions style={{ justifyContent: 'center' }}>
        <BaseButton disabled={!isEmailValid}>Nulstil</BaseButton>
      </CardActions>
    </form>
  );
};

export default ResetPasswordMailForm;
