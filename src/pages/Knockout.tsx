import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { useCurrentPlayer, useKnockout, useWatchKnockout } from '../hooks';
import { Game, Knockout as KnockoutType, Match, Player } from '../api';
import * as React from 'react';

interface KnockoutParams {
  game: Game;
  match: KnockoutType;
}

const getStartScreen = (
  game: Game,
  player: Player | null,
  match: KnockoutType,
  setMatch: (m: Match) => void,
  startKnockout: (
    matchId: string,
    distance: number,
    numberOfDiscs: number,
  ) => Promise<KnockoutType>,
) => {
  const [isStarting, setIsStarting] = React.useState(false);
  const isHost =
    Boolean(match?.hostPlayerUsername) &&
    Boolean(player?.username) &&
    match?.hostPlayerUsername.toLowerCase() == player?.username?.toLowerCase();

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {game.name}
      </Typography>
      {isHost ? (
        <>
          <Typography
            key={player.username}
            variant="h6"
            align="center"
            color="secondary"
            gutterBottom
            marginBottom={3}
          >
            You are the host
          </Typography>
          <Grid
            container
            columns={{ sx: 6, sm: 12 }}
            spacing={5}
            sx={{ mb: 3 }}
          >
            <Grid item xs={6} sx={{ width: '100%' }}>
              <TextField
                key={player.username}
                type="number"
                id="distance"
                margin="none"
                label="Distance from Basket"
                name="distance"
                color="primary"
                sx={{ width: '100%' }}
                defaultValue={18}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">ft</InputAdornment>
                  ),
                }}
                onChange={event => {
                  match.distance = Number(event.target.value);
                  setMatch(match);
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
                  match.numberOfDiscs = Number(event.target.value);
                  setMatch(match);
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
                match.id,
                match.distance || 18,
                match.numberOfDiscs || 5,
              );
            }}
            disabled={isStarting}
          >
            {isStarting ? 'Starting...' : 'Start'}
          </Button>
        </>
      ) : (
        <Typography
          variant="h6"
          color="secondary"
          sx={{ fontStyle: 'italic' }}
          textAlign="center"
        >
          Waiting for host to start...
        </Typography>
      )}
    </>
  );
};

const getPlayingContent = (
  match: KnockoutType,
  player: Player | null,
  game: Game,
) => {
  // Current player's turn
  if (match.currentPlayer === player?.username) {
    return (
      <>
        <Typography variant="h4" align="center" gutterBottom>
          {`${match?.distance}' ${game.name}`}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          How many putts did you make this round?
        </Typography>
        <Grid container spacing={2}>
          {Array.from(Array((match.numberOfDiscs || 5) + 1).keys())
            .map(x => x)
            .map(g => (
              <Grid key={g} item sm={6} xs={6}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth={true}
                  sx={{ height: '5rem', fontSize: 28, fontWeight: 600 }}
                >
                  {g}
                </Button>
              </Grid>
            ))}
        </Grid>
      </>
    );
  } else {
    return (
      <Typography
        color="secondary"
        fontStyle="italic"
        variant="h4"
        align="center"
        gutterBottom
      >
        {`It's ${match?.currentPlayer}'s turn.`}
      </Typography>
    );
  }
};

const Knockout: React.FC<KnockoutParams> = ({ game, match: incomingMatch }) => {
  const { player } = useCurrentPlayer();
  const [match, setMatch] = React.useState(incomingMatch);
  const { startKnockout } = useKnockout();

  useWatchKnockout(match, setMatch);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%',
      }}
    >
      {!match.matchStart
        ? getStartScreen(game, player, match, setMatch, startKnockout)
        : getPlayingContent(match, player, game)}
    </Box>
  );
};

export default Knockout;
