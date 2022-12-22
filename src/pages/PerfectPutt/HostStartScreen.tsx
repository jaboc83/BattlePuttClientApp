import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { Game, PerfectPutt, Player } from '../../api';
import { usePerfectPutt } from '../../hooks';

interface HostStartScreenProps {
  game: Game;
  perfectPutt: PerfectPutt;
}

const HostStartScreen: React.FC<HostStartScreenProps> = ({
  game,
  perfectPutt,
}) => {
  const { startPerfectPutt } = usePerfectPutt();
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
      <Grid container columns={{ sx: 6, sm: 12 }} spacing={5} sx={{ mb: 3 }}>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            id="numberOfDiscs"
            type="number"
            margin="none"
            label="Number of Discs"
            name="numberOfDiscs"
            color="primary"
            sx={{ width: '100%' }}
            defaultValue={numberOfDiscs}
            error={!isValidNumOfDiscs()}
            helperText={
              !isValidNumOfDiscs()
                ? 'Number of discs must be between 5 and 10'
                : null
            }
            InputProps={{ inputProps: { min: 5, max: 10 } }}
            onChange={event => {
              setNumOfDiscs(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ width: '100%' }}>
          <TextField
            id="firstDistance"
            type="number"
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
            InputProps={{
              inputProps: { min: 10, max: 10 },
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
            type="number"
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
            InputProps={{
              inputProps: { min: 10, max: 70 },
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
            type="number"
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
            InputProps={{
              inputProps: { min: 10, max: 70 },
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
            type="number"
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
            InputProps={{
              inputProps: { min: 10, max: 70 },
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
            type="number"
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
            InputProps={{
              inputProps: { min: 10, max: 70 },
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
          startPerfectPutt(
            perfectPutt.matchId,
            stationDistances.map(d => Number(d)),
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
