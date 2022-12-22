import { Box } from '@mui/material';
import { useCurrentPlayer, useWatchPerfectPutt } from '../../hooks';
import { Game, PerfectPutt, Player } from '../../api';
import * as React from 'react';
import HostStartScreen from './HostStartScreen';
import CurrentPlayerScreen from './CurrentPlayerScreen';
import WaitingPlayerScreen from './WaitingPlayerScreen';
import Typography from '@mui/material/Typography';
import GuestStartScreen from '../GuestStartScreen';

interface PerfectPuttPageParams {
  game: Game;
  perfectPutt: PerfectPutt;
}

const getStartScreen = (
  game: Game,
  perfectPutt: PerfectPutt,
  player: Player | null,
) => {
  const isHost =
    Boolean(perfectPutt?.hostPlayerUsername) &&
    Boolean(player?.username) &&
    perfectPutt?.hostPlayerUsername?.toLowerCase() ==
      player?.username?.toLowerCase();
  return isHost ? (
    <HostStartScreen game={game} perfectPutt={perfectPutt} />
  ) : (
    <GuestStartScreen hostName={perfectPutt.hostPlayerUsername!} />
  );
};

const getPlayerScreen = (
  game: Game,
  perfectPutt: PerfectPutt,
  player: Player | null,
) => {
  const isCurrentPlayer =
    perfectPutt.currentPlayer?.toLowerCase() ===
    player?.username?.toLowerCase();
  return isCurrentPlayer ? (
    <CurrentPlayerScreen game={game} perfectPutt={perfectPutt} />
  ) : (
    <WaitingPlayerScreen perfectPutt={perfectPutt} />
  );
};

const getFinishScreen = (perfectPutt: PerfectPutt, player: Player | null) => {
  const currentPlayer = perfectPutt.players.find(
    p => p?.username?.toLowerCase() === player?.username?.toLowerCase(),
  );
  const singlePlayer = perfectPutt.players.length == 1;
  if (singlePlayer) {
    return (
      <Typography variant="h3" color="secondary" align="center">
        You finished with {currentPlayer?.score} points!
      </Typography>
    );
  }
  const sortedPlayers = perfectPutt.players.sort(
    (a, b) => Number(b.score) - Number(a.score),
  );
  const isTie =
    sortedPlayers.length > 1 &&
    sortedPlayers[0].score == sortedPlayers[1].score;
  const winner = perfectPutt.players.sort(
    (a, b) => Number(b.score) - Number(a.score),
  )[0];
  const isWinner =
    winner.username?.toLowerCase() === player?.username?.toLowerCase();
  if (isTie && winner.score === currentPlayer?.score) {
    return (
      <Typography variant="h3" color="secondary" align="center">
        You tied with {winner.score} points!
      </Typography>
    );
  } else if (isWinner) {
    return (
      <Typography variant="h3" color="secondary" align="center">
        You win with {winner.score} points!
      </Typography>
    );
  } else {
    return (
      <Typography variant="h3" color="secondary" align="center">
        {isTie ? 'Winners tied ' : `${winner.username} won`} with {winner.score}{' '}
        points.
      </Typography>
    );
  }
};

const PerfectPuttPage: React.FC<PerfectPuttPageParams> = ({
  game,
  perfectPutt: incomingPerfectPutt,
}) => {
  const { player } = useCurrentPlayer();
  const [perfectPutt, setPerfectPutt] = React.useState(incomingPerfectPutt);

  // Keep polling for updates
  useWatchPerfectPutt(perfectPutt, setPerfectPutt);

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
      {!perfectPutt.matchStart
        ? getStartScreen(game, perfectPutt, player)
        : null}
      {/* Game in progress */}
      {perfectPutt.matchStart && !perfectPutt.matchComplete
        ? getPlayerScreen(game, perfectPutt, player)
        : null}
      {/* Game complete*/}
      {perfectPutt.matchComplete ? getFinishScreen(perfectPutt, player) : null}
    </Box>
  );
};

export default PerfectPuttPage;
