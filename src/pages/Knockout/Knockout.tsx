import { Box } from '@mui/material';
import { useCurrentPlayer, useWatchKnockout } from '../../hooks';
import { Game, Knockout, Player } from '../../api';
import * as React from 'react';
import HostStartScreen from './HostStartScreen';
import GuestStartScreen from './GuestStartScreen';
import CurrentPlayerScreen from './CurrentPlayerScreen';
import WaitingPlayerScreen from './WaitingPlayerScreen';
import Typography from '@mui/material/Typography';

interface KnockoutPageParams {
  game: Game;
  knockout: Knockout;
}

const getStartScreen = (
  game: Game,
  knockout: Knockout,
  player: Player | null,
) => {
  const isHost =
    Boolean(knockout?.hostPlayerUsername) &&
    Boolean(player?.username) &&
    knockout?.hostPlayerUsername.toLowerCase() ==
      player?.username?.toLowerCase();
  return isHost ? (
    <HostStartScreen game={game} knockout={knockout} />
  ) : (
    <GuestStartScreen hostName={knockout.hostPlayerUsername} />
  );
};

const getPlayerScreen = (
  game: Game,
  knockout: Knockout,
  player: Player | null,
) => {
  const isCurrentPlayer =
    knockout.currentPlayer?.toLowerCase() === player?.username?.toLowerCase();
  return isCurrentPlayer ? (
    <CurrentPlayerScreen game={game} knockout={knockout} />
  ) : (
    <WaitingPlayerScreen knockout={knockout} />
  );
};

const getFinishScreen = (
  game: Game,
  knockout: Knockout,
  player: Player | null,
) => {
  const isWinner =
    knockout.players
      .sort((a, b) => Number(b.score) - Number(a.score))[0]
      .playerUsername?.toLowerCase() === player?.username?.toLowerCase();
  return isWinner ? (
    <Typography variant="h3" color="secondary" align="center">
      You Win!
    </Typography>
  ) : (
    <Typography variant="h3" color="secondary" align="center">
      You Lose.
    </Typography>
  );
};

const KnockoutPage: React.FC<KnockoutPageParams> = ({
  game,
  knockout: incomingKnockout,
}) => {
  const { player } = useCurrentPlayer();
  const [knockout, setKnockout] = React.useState(incomingKnockout);

  // Keep polling for updates
  useWatchKnockout(knockout, setKnockout);

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
      {!knockout.matchStart ? getStartScreen(game, knockout, player) : null}
      {/* Game in progress */}
      {knockout.matchStart && !knockout.matchComplete
        ? getPlayerScreen(game, knockout, player)
        : null}
      {/* Game complete*/}
      {knockout.matchComplete ? getFinishScreen(game, knockout, player) : null}
    </Box>
  );
};

export default KnockoutPage;
