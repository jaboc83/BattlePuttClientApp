import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { Game, Knockout, Player } from '../../api';
import { useKnockout } from '../../hooks';

interface HostStartScreenProps {
  game: Game;
  knockout: Knockout;
}

const HostStartScreen: React.FC<HostStartScreenProps> = ({
  game,
  knockout,
}) => {
  const { startKnockout } = useKnockout();
  const [isStarting, setIsStarting] = React.useState(false);
  const [numberOfDiscs, setNumberOfDiscs] = React.useState('5');
  const [distance, setDistance] = React.useState('18');
  const isValidDistance = () => {
    return (
      !Number.isNaN(parseInt(distance)) &&
      Number(distance) <= 70 &&
      Number(distance) >= 10
    );
  };
  const isValidDiscCount = () => {
    return (
      !Number.isNaN(parseInt(numberOfDiscs)) &&
      Number(numberOfDiscs) <= 5 &&
      Number(numberOfDiscs) > 0
    );
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
      <Grid container columns={{ sx: 6, sm: 12 }} spacing={5} sx={{ mb: 3 }}>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            id="distance"
            type="number"
            margin="none"
            label="Distance from Basket"
            name="distance"
            color="primary"
            sx={{ width: '100%' }}
            defaultValue={18}
            error={!isValidDistance()}
            helperText={
              !isValidDistance()
                ? 'Distance must be between 10 and 70 feet'
                : null
            }
            InputProps={{
              inputProps: { min: 10, max: 70 },
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            onChange={event => {
              setDistance(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            id="numberOfDiscs"
            margin="none"
            label="Number of Discs"
            name="numberOfDiscs"
            color="primary"
            error={!isValidDiscCount()}
            helperText={
              !isValidDiscCount()
                ? 'Number of Discs must be between 1 and 5'
                : null
            }
            defaultValue={5}
            sx={{ width: '100%' }}
            InputProps={{ inputProps: { min: 1, max: 5 } }}
            onChange={event => {
              setNumberOfDiscs(event.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Button
        sx={{ margin: 'auto' }}
        size="large"
        variant="contained"
        onClick={() => {
          setIsStarting(true);
          startKnockout(
            knockout.matchId,
            Number(distance),
            Number(numberOfDiscs),
          );
        }}
        disabled={isStarting}
      >
        {isStarting ? 'Starting...' : 'Start'}
      </Button>
    </>
  );
};

export default HostStartScreen;
