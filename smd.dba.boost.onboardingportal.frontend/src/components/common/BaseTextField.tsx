import { TextField, InputAdornment } from '@mui/material';
import { BaseTextFieldProps } from '../../types/componentProps';

function BaseTextField({
  label,
  type,
  value,
  onChange,
  onFocus,
  error,
  required,
  fullWidth,
  margin,
  endAdornment,
}: BaseTextFieldProps) {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      fullWidth={fullWidth}
      margin={margin}
      required={required}
      error={error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
    />
  );
}

export default BaseTextField;
