import { Box } from '@mui/material';
import { useCurrentPlayer, useWatchFiftyPutts } from '../../hooks';
import { Game, FiftyPutts, Player } from '../../api';
import * as React from 'react';
import HostStartScreen from './HostStartScreen';
import CurrentPlayerScreen from './CurrentPlayerScreen';
import WaitingPlayerScreen from './WaitingPlayerScreen';
import Typography from '@mui/material/Typography';
import GuestStartScreen from '../GuestStartScreen';

interface FiftyPuttsPageParams {
  game: Game;
  fiftyPutts: FiftyPutts;
}

const getStartScreen = (
  game: Game,
  fiftyPutts: FiftyPutts,
  player: Player | null,
) => {
  const isHost =
    Boolean(fiftyPutts?.hostPlayerUsername) &&
    Boolean(player?.username) &&
    fiftyPutts?.hostPlayerUsername?.toLowerCase() ==
      player?.username?.toLowerCase();
  return isHost ? (
    <HostStartScreen game={game} fiftyPutts={fiftyPutts} />
  ) : (
    <GuestStartScreen hostName={fiftyPutts.hostPlayerUsername!} />
  );
};

const getPlayerScreen = (
  game: Game,
  fiftyPutts: FiftyPutts,
  player: Player | null,
) => {
  const isCurrentPlayer =
    fiftyPutts.currentPlayer?.toLowerCase() === player?.username?.toLowerCase();
  return isCurrentPlayer ? (
    <CurrentPlayerScreen game={game} fiftyPutts={fiftyPutts} />
  ) : (
    <WaitingPlayerScreen fiftyPutts={fiftyPutts} />
  );
};

const getFinishScreen = (fiftyPutts: FiftyPutts, player: Player | null) => {
  const currentPlayer = fiftyPutts.players.find(
    p => p?.username?.toLowerCase() === player?.username?.toLowerCase(),
  );
  const singlePlayer = fiftyPutts.players.length == 1;
  if (singlePlayer) {
    return (
      <Typography variant="h3" color="secondary" align="center">
        You finished with {currentPlayer?.score} points!
      </Typography>
    );
  }
  const sortedPlayers = fiftyPutts.players.sort(
    (a, b) => Number(b.score) - Number(a.score),
  );
  const isTie =
    sortedPlayers.length > 1 &&
    sortedPlayers[0].score == sortedPlayers[1].score;
  const winner = fiftyPutts.players.sort(
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

const FiftyPuttsPage: React.FC<FiftyPuttsPageParams> = ({
  game,
  fiftyPutts: incomingFiftyPutts,
}) => {
  const { player } = useCurrentPlayer();
  const [fiftyPutts, setFiftyPutts] = React.useState(incomingFiftyPutts);

  // Keep polling for updates
  useWatchFiftyPutts(fiftyPutts, setFiftyPutts);

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
      {!fiftyPutts.matchStart ? getStartScreen(game, fiftyPutts, player) : null}
      {/* Game in progress */}
      {fiftyPutts.matchStart && !fiftyPutts.matchComplete
        ? getPlayerScreen(game, fiftyPutts, player)
        : null}
      {/* Game complete*/}
      {fiftyPutts.matchComplete ? getFinishScreen(fiftyPutts, player) : null}
    </Box>
  );
};

export default FiftyPuttsPage;
