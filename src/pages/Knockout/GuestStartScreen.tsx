import { Typography } from '@mui/material';
import * as React from 'react';

interface GuestStartScreenProps {
  hostName: string;
}

const GuestStartScreen: React.FC<GuestStartScreenProps> = ({ hostName }) => (
  <Typography
    variant="h6"
    color="secondary"
    sx={{ fontStyle: 'italic' }}
    textAlign="center"
  >
    {`Waiting for ${hostName ?? 'host'} to start...`}
  </Typography>
);
export default GuestStartScreen;
