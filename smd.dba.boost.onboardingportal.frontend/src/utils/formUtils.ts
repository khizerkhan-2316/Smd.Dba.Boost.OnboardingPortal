function validateEmail(email: string): boolean {
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
