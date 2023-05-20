import { useState, useEffect } from 'react';
import { CardActions } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';
import { handleInputFieldChange, validateEmail } from '../../utils/formUtils';

import { ContactPersonFormProps } from '../../types/props';
import BaseTextField from '../common/BaseTextField';
import BaseButton from '../common/BaseButton';
import { handleSubmit } from '../../utils/formUtils';

const ContactPersonForm = ({
  onSubmit,
  buttonTitle,
  companyId,
  contactPerson,
}: ContactPersonFormProps) => {
  const [name, setName] = useState(contactPerson?.name || '');
  const [email, setEmail] = useState(contactPerson?.email || '');
  const [telephone, setTelephone] = useState(contactPerson?.telephone || '');

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isTelephoneValid, setIsTelephoneValid] = useState(false);

  const [isNameInputTouched, setIsNameInputTouched] = useState(false);
  const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);
  const [isTelephoneInputTouched, setIsTelephoneInputTouched] = useState(false);

  useEffect(() => {
    if (contactPerson) {
      setIsNameValid(contactPerson.name.length > 0);
      setIsEmailValid(validateEmail(contactPerson.email));
      setIsTelephoneValid(
        contactPerson.telephone.length === 8 &&
          !isNaN(Number(contactPerson.telephone))
      );
    }
  }, [contactPerson]);

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, isNameValid && isEmailValid && isTelephoneValid, () =>
          onSubmit({
            name,
            email,
            telephone,
            companyId,
          })
        )
      }
    >
      <BaseTextField
        label="Navn"
        type="text"
        value={name}
        onChange={(e) =>
          handleInputFieldChange(
            e,
            setName,
            setIsNameValid,
            setIsNameInputTouched,
            (value) => value.length > 0
          )
        }
        onFocus={() => setIsNameInputTouched(true)}
        fullWidth
        margin="normal"
        required
        error={!isNameValid && isNameInputTouched}
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
      <BaseTextField
        label="Telefon"
        type="text"
        value={telephone}
        onChange={(e) =>
          handleInputFieldChange(
            e,
            setTelephone,
            setIsTelephoneValid,
            setIsTelephoneInputTouched,
            (value) => value.length === 8 && !isNaN(Number(value))
          )
        }
        onFocus={() => setIsTelephoneInputTouched(true)}
        fullWidth
        margin="normal"
        required
        error={!isTelephoneValid && isTelephoneInputTouched}
      />
      <CardActions style={{ justifyContent: 'center' }}>
        <BaseButton
          disabled={!(isNameValid && isEmailValid && isTelephoneValid)}
        >
          {buttonTitle}
        </BaseButton>
      </CardActions>
    </form>
  );
};

export default ContactPersonForm;
