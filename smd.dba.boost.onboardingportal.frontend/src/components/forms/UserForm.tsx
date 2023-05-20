import { useState, useEffect } from 'react';
import { CardActions } from '@mui/material';
import { EmailOutlined, LockOutlined } from '@mui/icons-material';
import { handleInputFieldChange, validateEmail } from '../../utils/formUtils';
import BaseTextField from '../common/BaseTextField';
import BaseButton from '../common/BaseButton';
import { handleSubmit } from '../../utils/formUtils';
import { UserFormProps } from '../../types/props';

const UserForm = ({
  onSubmit,
  buttonTitle,
  companyId,
  role,
  user,
}: UserFormProps) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isUsernameInputTouched, setIsUsernameInputTouched] = useState(false);
  const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);
  const [isPasswordInputTouched, setIsPasswordInputTouched] = useState(false);

  useEffect(() => {
    if (user) {
      setIsUsernameValid(user.username.length > 0);
      setIsEmailValid(validateEmail(user.email));
    }
  }, [user]);

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(
          e,
          user
            ? isUsernameValid && isEmailValid
            : isUsernameValid && isEmailValid && isPasswordValid,
          () =>
            onSubmit(
              user
                ? { username, email, companyId, role }
                : { username, email, password, companyId, role }
            )
        )
      }
    >
      <BaseTextField
        label="Brugernavn"
        type="text"
        value={username}
        onChange={(e) =>
          handleInputFieldChange(
            e,
            setUsername,
            setIsUsernameValid,
            setIsUsernameInputTouched,
            (value) => value.length > 0
          )
        }
        onFocus={() => setIsUsernameInputTouched(true)}
        fullWidth
        margin="normal"
        required
        error={!isUsernameValid && isUsernameInputTouched}
      />
      <BaseTextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) =>
          handleInputFieldChange(
            e,
            setEmail,
            setIsEmailValid,
            setIsEmailInputTouched,
            validateEmail
          )
        }
        onFocus={() => setIsEmailInputTouched(true)}
        fullWidth
        margin="normal"
        required
        error={!isEmailValid && isEmailInputTouched}
        endAdornment={<EmailOutlined />}
      />
      {!user && (
        <BaseTextField
          label="Adgangskode"
          type="password"
          value={password}
          onChange={(e) =>
            handleInputFieldChange(
              e,
              setPassword,
              setIsPasswordValid,
              setIsPasswordInputTouched,
              (value) => value.length > 0
            )
          }
          onFocus={() => setIsPasswordInputTouched(true)}
          fullWidth
          margin="normal"
          required
          error={!isPasswordValid && isPasswordInputTouched}
          endAdornment={<LockOutlined />}
        />
      )}
      <CardActions style={{ justifyContent: 'center' }}>
        <BaseButton
          disabled={
            user
              ? !(isUsernameValid && isEmailValid)
              : !(isUsernameValid && isEmailValid && isPasswordValid)
          }
        >
          {buttonTitle}
        </BaseButton>
      </CardActions>
    </form>
  );
};

export default UserForm;
