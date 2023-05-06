import { Card, CardContent, Box, Typography, Divider } from '@mui/material';
import Link from '../common/Link';

function BaseCard({
  children,
  title,
  linkTitle,
  path,
}: {
  children: React.ReactNode;
  title: string;
  linkTitle: string;
  path: string;
}) {
  return (
    <Card
      style={{
        width: '60%',
        height: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Box style={{ width: '50%', padding: '24px' }}>
        <CardContent>
          <img
            src="data:image/png;base64,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"
            style={{ width: '60%', height: 'auto', paddingBottom: '20px' }}
            alt="placeholder"
          />

          <Typography
            variant="h6"
            color="textPrimary"
            style={{
              marginTop: '16px',
              marginBottom: '16px',
              fontWeight: 'bold',
            }}
          >
            {title}
          </Typography>

          {children}

          <Divider sx={{ my: 2 }} />
          <Typography align="right">
            <Link to={path}>{linkTitle}</Link>
          </Typography>
        </CardContent>
      </Box>
      <Box
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: '#E1EEFA',
        }}
      >
      </Box>
    </Card>
  );
}

export default BaseCard;
