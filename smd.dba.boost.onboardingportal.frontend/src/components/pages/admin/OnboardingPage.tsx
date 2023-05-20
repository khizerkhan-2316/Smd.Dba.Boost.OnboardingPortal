import OnboardingFlowOverview from '../../common/OnboardingFlowOverview';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div style={{ width: '95%' }}>
      <h1>ONBOARDING PAGE</h1>

      <Button
        sx={{ margin: '10px 0px 10px 0px' }}
        variant="contained"
        color="primary"
        onClick={handleGoBack}
      >
        Tilbage
      </Button>
      <OnboardingFlowOverview />
    </div>
  );
};

export default OnboardingPage;
