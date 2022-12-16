import { Box } from '@mui/material';
import { useCurrentPlayer, useWatchKnockout } from '../../hooks';
import { Game, Knockout, Player } from '../../api';
import * as React from 'react';
import HostStartScreen from './HostStartScreen';
import GuestStartScreen from './GuestStartScreen';
import CurrentPlayerScreen from './CurrentPlayerScreen';
import WaitingPlayerScreen from './WaitingPlayerScreen';

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
      {!knockout.matchStart
        ? getStartScreen(game, knockout, player)
        : getPlayerScreen(game, knockout, player)}
    </Box>
  );
};

export default KnockoutPage;
