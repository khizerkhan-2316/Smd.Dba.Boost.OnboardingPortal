import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You are not authorized to access this page.</p>
      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
