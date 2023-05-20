export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password: string): boolean {
  return password.trim().length > 1;
}

export function handleEmailChange(
  event: React.ChangeEvent<HTMLInputElement>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>,
  isEmailInputTouched: boolean
) {
  const emailValue = event.target.value;
  setEmail(emailValue);
  setIsEmailValid(isEmailInputTouched ? validateEmail(emailValue) : false);
}

export function handlePasswordChange(
  event: React.ChangeEvent<HTMLInputElement>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>,
  isPasswordInputTouched: boolean
) {
  const passwordValue = event.target.value;
  setPassword(passwordValue);
  setIsPasswordValid(
    isPasswordInputTouched ? validatePassword(passwordValue) : false
  );
}

export function handleInputFieldChange(
  event: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setIsTouched: React.Dispatch<React.SetStateAction<boolean>>,
  validationFn?: (value: string) => boolean
) {
  const inputValue = event.target.value;
  setState(inputValue);
  setIsTouched(true);

  if (validationFn) {
    setIsValid(validationFn(inputValue));
  }
}

export async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  isFormValid: boolean,
  onSubmit: Function
) {
  event.preventDefault();
  if (isFormValid) {
    await onSubmit();
  }
}

export function isValidUrl(url: string): boolean {
  try {
    return Boolean(new URL(url));
  } catch (error) {
    return false;
  }
}
