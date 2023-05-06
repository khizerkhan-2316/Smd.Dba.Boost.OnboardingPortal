import { Button } from '@mui/material';

function BaseButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled: boolean;
}) {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={disabled}
      fullWidth
    >
      {children}
    </Button>
  );
}

export default BaseButton;
