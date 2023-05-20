import { useState, useEffect } from 'react';
import { CardActions } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { handleInputFieldChange, validateEmail } from '../../utils/formUtils';

import BaseTextField from '../common/BaseTextField';
import BaseButton from '../common/BaseButton';

import { CompanyFormProps } from '../../types/props';
import { handleSubmit } from '../../utils/formUtils';

const CompanyForm = ({ onSubmit, buttonTitle, company }: CompanyFormProps) => {
  const [companyName, setCompanyName] = useState(company?.companyName || '');
  const [streetName, setStreetName] = useState(company?.streetName || '');
  const [postalCode, setPostalCode] = useState(company?.postalCode || '');
  const [city, setCity] = useState(company?.city || '');
  const [telephone, setTelephone] = useState(company?.telephone || '');
  const [cvr, setCvr] = useState(company?.cvr || '');
  const [loginEmail, setLoginEmail] = useState(company?.loginEmail || '');
  const [invoiceEmail, setInvoiceEmail] = useState(company?.invoiceEmail || '');

  const [isCompanyNameValid, setIsCompanyNameValid] = useState(false);
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(true);
  const [isTelephoneValid, setIsTelephoneValid] = useState(true);
  const [isCvrValid, setIsCvrValid] = useState(true);
  const [isLoginEmailValid, setIsLoginEmailValid] = useState(true);
  const [isInvoiceEmailValid, setIsInvoiceEmailValid] = useState(true);

  const [isCompanyNameInputTouched, setIsCompanyNameInputTouched] =
    useState(false);

  const [isPostalCodeInputTouched, setIsPostalCodeInputTouched] =
    useState(false);

  const [isTelephoneInputTouched, setIsTelephoneInputTouched] = useState(false);

  const [isCvrInputTouched, setIsCvrInputTouched] = useState(false);

  const [isLoginEmailInputTouched, setIsLoginEmailInputTouched] =
    useState(false);
  const [isInvoiceEmailInputTouched, setIsInvoiceEmailInputTouched] =
    useState(false);

  useEffect(() => {
    if (company) {
      setIsCompanyNameValid(company.companyName.length > 0);
      setIsLoginEmailValid(
        company.loginEmail.length === 0
          ? true
          : validateEmail(company.loginEmail)
      );
      setIsInvoiceEmailValid(
        company.invoiceEmail.length === 0
          ? true
          : validateEmail(company.invoiceEmail)
      );
    }
  }, [company]);

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(
          e,
          isCompanyNameValid && isLoginEmailValid && isInvoiceEmailValid,
          () =>
            onSubmit({
              companyName,
              streetName,
              postalCode,
              city,
              telephone,
              cvr,
              loginEmail,
              invoiceEmail,
            })
        )
      }
    >
      <BaseTextField
        label="Virksomhedsnavn"
        type="text"
        value={companyName}
        onChange={(e) =>
          handleInputFieldChange(
            e,
            setCompanyName,
            setIsCompanyNameValid,
            setIsCompanyNameInputTouched,
            (value) => value.length > 0
          )
        }
        onFocus={() => setIsCompanyNameInputTouched(true)}
        fullWidth
        margin="normal"
        required
        error={!isCompanyNameValid && isCompanyNameInputTouched}
      />
      <BaseTextField
        label="Vejnavn"
        value={streetName}
        type="text"
        onChange={(e) => setStreetName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <BaseTextField
          label="Postnummer"
          value={postalCode}
          type="text"
          onChange={(e) =>
            handleInputFieldChange(
              e,
              setPostalCode,
              setIsPostalCodeValid,
              setIsPostalCodeInputTouched,
              (value) =>
                value === '' || (value.length === 4 && !isNaN(Number(value)))
            )
          }
          error={
            !isPostalCodeValid &&
            isPostalCodeInputTouched &&
            postalCode.trim().length > 0
          }
          fullWidth
          margin="normal"
        />
        <BaseTextField
          label="By"
          value={city}
          type="text"
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Box>
      <BaseTextField
        label="Telefonnummer"
        value={telephone}
        type="text"
        onChange={(e) =>
          handleInputFieldChange(
            e,
            setTelephone,
            setIsTelephoneValid,
            setIsTelephoneInputTouched,
            (value) =>
              value === '' || (value.length === 8 && !isNaN(Number(value)))
          )
        }
        fullWidth
        margin="normal"
        error={
          !isTelephoneValid &&
          isTelephoneInputTouched &&
          telephone.trim().length > 0
        }
        // Add validation and other props as needed
      />

      <BaseTextField
        label="Cvr"
        value={cvr}
        type="text"
        onChange={(e) =>
          handleInputFieldChange(
            e,
            setCvr,
            setIsCvrValid,
            setIsCvrInputTouched,
            (value) =>
              value === '' || (value.length === 8 && !isNaN(Number(value)))
          )
        }
        fullWidth
        margin="normal"
        // Add validation and other props as needed
        error={!isCvrValid && isCvrInputTouched && cvr.trim().length > 0}
      />
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <BaseTextField
          label="Login email"
          value={loginEmail}
          type="text"
          onChange={(e) =>
            handleInputFieldChange(
              e,
              setLoginEmail,
              setIsLoginEmailValid,
              setIsLoginEmailInputTouched,
              function (value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return value === '' || emailPattern.test(value);
              }
            )
          }
          fullWidth
          margin="normal"
          error={
            !isLoginEmailValid &&
            isLoginEmailInputTouched &&
            loginEmail.trim().length > 0
          }
          endAdornment={<EmailOutlined />}
        />

        <BaseTextField
          label="Faktueringsemail"
          value={invoiceEmail}
          type="text"
          onChange={(e) =>
            handleInputFieldChange(
              e,
              setInvoiceEmail,
              setIsInvoiceEmailValid,
              setIsInvoiceEmailInputTouched,
              function (value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return value === '' || emailPattern.test(value);
              }
            )
          }
          fullWidth
          margin="normal"
          error={
            !isInvoiceEmailValid &&
            isInvoiceEmailInputTouched &&
            invoiceEmail.trim().length > 0
          }
          endAdornment={<EmailOutlined />}
        />
      </Box>

      {/* Add similar fields for other inputs */}
      <CardActions style={{ justifyContent: 'center' }}>
        <BaseButton
          disabled={
            !(
              isCompanyNameValid &&
              isInvoiceEmailValid &&
              isLoginEmailValid &&
              isCvrValid &&
              isTelephoneValid &&
              isPostalCodeValid
            )
          }
        >
          {buttonTitle}
        </BaseButton>
      </CardActions>
    </form>
  );
};

export default CompanyForm;
