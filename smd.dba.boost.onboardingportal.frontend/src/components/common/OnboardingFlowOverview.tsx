import {
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { HelpOutline } from '@mui/icons-material';

import { OnboardingStep } from '../../types/onboardingStep';

const OnboardingFlowOverview = () => {
  const steps: OnboardingStep[] = [
    {
      label: 'Virksomhedsoplysninger',
      description: [
        <p>
          Vi har brug for nogle oplysninger om din virksomhed, så vi kan oprette
          en virksomhedsprofil til dig.
        </p>,
        <br />,
        <p>
          Du skal blot udfylde formularen med de nødvendige oplysninger og
          trykke på Næste
        </p>,
      ],
      completed: false,
    },
    {
      label: 'Productfeed link',
      description:
        "Vi har brug for et link til din productfeed, så vi kan hente dine produkter. Du skal blot indsætte linket i feltet og trykke på 'Næste'.",
      completed: false,
    },
    {
      label: 'Administrativt arbejde',
      description:
        "Vi skal bruge adgang til din Google Ads konto, så vi kan oprette en kampagne for dig. Du skal blot trykke på 'Tilføj konto' og følge instruktionerne.",
      completed: false,
    },
    {
      label: 'Virksomhedsprofil oprettelse',
      description:
        "Vi har brug for nogle oplysninger om din virksomhed, så vi kan oprette en virksomhedsprofil til dig. Du skal blot udfylde formularen med de nødvendige oplysninger og trykke på 'Næste'.",
      completed: false,
    },
    {
      label: 'Godkendelse af produkt feed',
      description:
        "Vi har brug for et link til din productfeed, så vi kan hente dine produkter. Du skal blot indsætte linket i feltet og trykke på 'Næste'.",
      completed: false,
    },
    {
      label: 'Design af Robot',
      description:
        "Vi skal bruge adgang til din Google Ads konto, så vi kan oprette en kampagne for dig. Du skal blot trykke på 'Tilføj konto' og følge instruktionerne.",
      completed: false,
    },
    {
      label: 'Robot og onboarding færdig',
      description:
        "Vi har brug for nogle oplysninger om din virksomhed, så vi kan oprette en virksomhedsprofil til dig. Du skal blot udfylde formularen med de nødvendige oplysninger og trykke på 'Næste'.",
      completed: false,
    },
  ];

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleModalOpen = (content: any) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepLabel
              onClick={() => handleModalOpen(step.description)}
              style={{ cursor: 'pointer' }}
            >
              <Tooltip title="Klik for mere information" placement="top">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <HelpOutline />
                  <Typography variant="caption" align="center">
                    {step.label}
                  </Typography>
                </Box>
              </Tooltip>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Step Details</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OnboardingFlowOverview;
