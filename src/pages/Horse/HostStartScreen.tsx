import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { Game, Horse, Player } from '../../api';
import { useHorse } from '../../hooks';

interface HostStartScreenProps {
  game: Game;
  horse: Horse;
}

const HostStartScreen: React.FC<HostStartScreenProps> = ({ game, horse }) => {
  const { startHorse } = useHorse();
  const [isStarting, setIsStarting] = React.useState(false);
  const [numberOfDiscs, setNumOfDiscs] = React.useState<string>('5');
  const [stationDistances, setStationDistances] = React.useState([
    '11',
    '15',
    '20',
    '25',
    '33',
  ]);
  const isValidNumOfDiscs = () => {
    return (
      !Number.isNaN(parseInt(numberOfDiscs)) &&
      Number(numberOfDiscs) >= 5 &&
      Number(numberOfDiscs) <= 10
    );
  };
  const isValidDistance = (position: number) => {
    let isValid =
      !Number.isNaN(parseInt(stationDistances[position])) &&
      Number(stationDistances[position]) <= 70 &&
      Number(stationDistances[position]) >= 10;
    if (position > 0 && position <= 5) {
      isValid =
        isValid &&
        Number(stationDistances[position]) >
          Number(stationDistances[position - 1]);
    }
    return isValid;
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {game.name}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="secondary"
        gutterBottom
        marginBottom={3}
      >
        You are the host; once everyone is connected click start.
      </Typography>
      <Button
        sx={{ margin: 'auto' }}
        size="large"
        variant="contained"
        onClick={() => {
          setIsStarting(true);
          startHorse(horse.matchId);
        }}
        disabled={isStarting}
      >
        {isStarting ? 'Starting...' : 'Start'}
      </Button>
    </>
  );
};

export default HostStartScreen;
