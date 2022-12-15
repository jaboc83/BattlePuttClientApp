import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useMatch } from '../hooks';
import { GameComponentParams } from '../App';

const Knockout = ({ game, match }: GameComponentParams) => {
  const { code } = useParams();

  return (
    <Box sx={{ margin: 'auto' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Knockout
        <Typography
          variant="h6"
          color={'secondary'}
          align="center"
          gutterBottom
        >
          {code}
        </Typography>
      </Typography>
    </Box>
  );
};

export default Knockout;
