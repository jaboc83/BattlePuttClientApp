import { Typography } from '@mui/material';
import { Knockout } from '../../api';
import * as React from 'react';

interface WaitingPlayerScreenProps {
  knockout: Knockout;
}
const WaitingPlayerScreen: React.FC<WaitingPlayerScreenProps> = ({
  knockout,
}) => {
  return (
    <Typography
      color="secondary"
      fontStyle="italic"
      variant="h4"
      align="center"
      gutterBottom
    >
      {knockout?.currentPlayer
        ? `It's ${knockout.currentPlayer}'s turn.`
        : "It's not your turn."}
    </Typography>
  );
};

export default WaitingPlayerScreen;
