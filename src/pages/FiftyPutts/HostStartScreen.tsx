import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { Game, FiftyPutts, Player } from '../../api';
import { useFiftyPutts } from '../../hooks';

interface HostStartScreenProps {
  game: Game;
  fiftyPutts: FiftyPutts;
}

const HostStartScreen: React.FC<HostStartScreenProps> = ({
  game,
  fiftyPutts,
}) => {
  const { startFiftyPutts } = useFiftyPutts();
  const [isStarting, setIsStarting] = React.useState(false);
  const [stationDistances, setStationDistances] = React.useState([
    '11',
    '15',
    '20',
    '25',
    '33',
  ]);
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
      <Grid container columns={{ sx: 6, sm: 12 }} spacing={5} sx={{ mb: 3 }}>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            id="firstDistance"
            margin="none"
            label="First Station Distance"
            name="firstDistance"
            color="primary"
            sx={{ width: '100%' }}
            defaultValue={stationDistances[0]}
            error={!isValidDistance(0)}
            helperText={
              !isValidDistance(0)
                ? "Distance must be between 10 and 70 feet, and can't be shorter than the previous station"
                : null
            }
            inputProps={{ maxLength: 2 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            onChange={event => {
              stationDistances[0] = event.target.value;
              setStationDistances(stationDistances);
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            id="secondDistance"
            margin="none"
            label="Second Station Distance"
            name="secondDistance"
            color="primary"
            sx={{ width: '100%' }}
            defaultValue={stationDistances[1]}
            error={!isValidDistance(1)}
            helperText={
              !isValidDistance(1)
                ? "Distance must be between 10 and 70 feet, and can't be shorter than the previous station"
                : null
            }
            inputProps={{ maxLength: 2 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            onChange={event => {
              stationDistances[1] = event.target.value;
              setStationDistances(stationDistances);
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            id="thirdDistance"
            margin="none"
            label="Third Station Distance"
            name="thirdDistance"
            color="primary"
            sx={{ width: '100%' }}
            defaultValue={stationDistances[2]}
            error={!isValidDistance(2)}
            helperText={
              !isValidDistance(2)
                ? "Distance must be between 10 and 70 feet, and can't be shorter than the previous station"
                : null
            }
            inputProps={{ maxLength: 2 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            onChange={event => {
              stationDistances[2] = event.target.value;
              setStationDistances(stationDistances);
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            id="fourthDistance"
            margin="none"
            label="Fourth Station Distance"
            name="fourthDistance"
            color="primary"
            sx={{ width: '100%' }}
            defaultValue={stationDistances[3]}
            error={!isValidDistance(3)}
            helperText={
              !isValidDistance(3)
                ? "Distance must be between 10 and 70 feet, and can't be shorter than the previous station"
                : null
            }
            inputProps={{ maxLength: 2 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            onChange={event => {
              stationDistances[3] = event.target.value;
              setStationDistances(stationDistances);
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            id="fifthDistance"
            margin="none"
            label="Fifth Station Distance"
            name="fifthDistance"
            color="primary"
            sx={{ width: '100%' }}
            defaultValue={stationDistances[4]}
            error={!isValidDistance(4)}
            helperText={
              !isValidDistance(4)
                ? "Distance must be between 10 and 70 feet, and can't be shorter than the previous station"
                : null
            }
            inputProps={{ maxLength: 2 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ft</InputAdornment>,
            }}
            onChange={event => {
              stationDistances[4] = event.target.value;
              setStationDistances(stationDistances);
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
          startFiftyPutts(
            fiftyPutts.matchId,
            stationDistances.map(d => Number(d)),
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
