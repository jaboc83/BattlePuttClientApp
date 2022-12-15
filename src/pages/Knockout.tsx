import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMatch } from '../hooks';

const Knockout = () => {
  const { code } = useParams();
  const { getMatchByCode } = useMatch();

  // Load Match
  React.useEffect(() => {
    if (code) {
      getMatchByCode(code);
    }
  }, []);

  return (
    <Box sx={{ margin: 'auto' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Knockout
      </Typography>
      <Typography variant="h6" color={'secondary'} align="center" gutterBottom>
        {code}
      </Typography>
    </Box>
  );
};

export default Knockout;
