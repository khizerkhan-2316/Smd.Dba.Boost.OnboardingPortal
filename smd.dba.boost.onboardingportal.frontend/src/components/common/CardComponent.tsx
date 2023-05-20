import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  PictureAsPdf,
  Description,
  InsertPhoto,
} from '@mui/icons-material';

interface CardData {
  subheading: string;
  description: string | React.ReactNode;
  downloadUrl?: string;
  downloadText?: string;
}

interface CardComponentProps {
  heading: string;
  cards: CardData[];
}

const cardStyle: React.CSSProperties = {
  width: '100%',
  marginTop: '50px',
};

const getFileIcon = (fileUrl: string): JSX.Element => {
  const fileType = fileUrl.split('.').pop()?.toLowerCase();

  if (fileType === 'pdf') {
    return <PictureAsPdf />;
  } else if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
    return <InsertPhoto />;
  } else {
    return <Description />;
  }
};

const CardComponent: React.FC<CardComponentProps> = ({ heading, cards }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ marginTop: 2 }}>
          {heading}
        </Typography>
        <Typography color="textSecondary" gutterBottom sx={{ marginTop: 2 }}>
          {cards[activeStep].subheading}
        </Typography>
        <Typography variant="body2" component="p" sx={{ marginBottom: 2 }}>
          {cards[activeStep].description}
        </Typography>

        {cards[activeStep].downloadUrl && (
          <Button
            href={cards[activeStep].downloadUrl!}
            target="_blank"
            startIcon={getFileIcon(cards[activeStep].downloadUrl!)}
          >
            {cards[activeStep].downloadText || 'Download'}
          </Button>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
          >
            Tilbage
          </Button>
          <Button
            disabled={activeStep === cards.length - 1}
            onClick={handleNext}
            endIcon={<ArrowForward />}
          >
            Næste
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
