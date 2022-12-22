import { Box } from '@mui/material';
import { useCurrentPlayer, useWatchHorse } from '../../hooks';
import { Game, Horse, Player } from '../../api';
import * as React from 'react';
import HostStartScreen from './HostStartScreen';
import CurrentPlayerScreen from './CurrentPlayerScreen';
import WaitingPlayerScreen from './WaitingPlayerScreen';
import Typography from '@mui/material/Typography';
import GuestStartScreen from '../GuestStartScreen';

interface HorsePageParams {
  game: Game;
  horse: Horse;
}

const getStartScreen = (game: Game, horse: Horse, player: Player | null) => {
  const isHost =
    Boolean(horse?.hostPlayerUsername) &&
    Boolean(player?.username) &&
    horse?.hostPlayerUsername?.toLowerCase() == player?.username?.toLowerCase();
  return isHost ? (
    <HostStartScreen game={game} horse={horse} />
  ) : (
    <GuestStartScreen hostName={horse.hostPlayerUsername!} />
  );
};

const getPlayerScreen = (game: Game, horse: Horse, player: Player | null) => {
  const isCurrentPlayer =
    horse.currentPlayer?.toLowerCase() === player?.username?.toLowerCase();
  return isCurrentPlayer ? (
    <CurrentPlayerScreen game={game} horse={horse} />
  ) : (
    <WaitingPlayerScreen horse={horse} />
  );
};

const getFinishScreen = (horse: Horse, player: Player | null) => {
  const currentPlayer = horse.players.find(
    p => p?.username?.toLowerCase() === player?.username?.toLowerCase(),
  );
  const singlePlayer = horse.players.length == 1;
  if (singlePlayer) {
    return (
      <Typography variant="h3" color="secondary" align="center">
        You finished with {currentPlayer?.score} points!
      </Typography>
    );
  }
  const winner = horse.players.find(p => p.score! < 5);
  const isWinner =
    winner?.username?.toLowerCase() === player?.username?.toLowerCase();
  if (isWinner) {
    return (
      <Typography variant="h3" color="secondary" align="center">
        You win!
      </Typography>
    );
  } else {
    return (
      <Typography variant="h3" color="secondary" align="center">
        {`${winner?.username} won`}
      </Typography>
    );
  }
};

const HorsePage: React.FC<HorsePageParams> = ({
  game,
  horse: incomingHorse,
}) => {
  const { player } = useCurrentPlayer();
  const [horse, setHorse] = React.useState(incomingHorse);

  // Keep polling for updates
  useWatchHorse(horse, setHorse);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%',
      }}
    >
      {/* Ready to start */}
      {!horse.matchStart ? getStartScreen(game, horse, player) : null}
      {/* Game in progress */}
      {horse.matchStart && !horse.matchComplete
        ? getPlayerScreen(game, horse, player)
        : null}
      {/* Game complete*/}
      {horse.matchComplete ? getFinishScreen(horse, player) : null}
    </Box>
  );
};

export default HorsePage;
