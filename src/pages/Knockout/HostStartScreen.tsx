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
  const [numberOfDiscs, setNumberOfDiscs] = React.useState(5);
  const [distance, setDistance] = React.useState(18);

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
        You are the host
      </Typography>
      <Grid container columns={{ sx: 6, sm: 12 }} spacing={5} sx={{ mb: 3 }}>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            type="number"
            id="distance"
            margin="none"
            label="Distance from Basket"
            name="distance"
            color="primary"
            sx={{ width: '100%' }}
            defaultValue={18}
            InputProps={{
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            onChange={event => {
              setDistance(Number(event.target.value));
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            type="number"
            id="numberOfDiscs"
            margin="none"
            label="Number of Discs"
            name="numberOfDiscs"
            color="primary"
            defaultValue={5}
            sx={{ width: '100%' }}
            onChange={event => {
              setNumberOfDiscs(Number(event.target.value));
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
          startKnockout(knockout.id, distance, numberOfDiscs);
        }}
        disabled={isStarting}
      >
        {isStarting ? 'Starting...' : 'Start'}
      </Button>
    </>
  );
};

export default HostStartScreen;
