import { Box, Button, Typography } from '@mui/material';
import { GameComponentParams } from '../App';
import { useCurrentPlayer } from '../hooks/useCurrentPlayer';

const Knockout: React.FC<GameComponentParams> = ({ game, match }) => {
  const { player } = useCurrentPlayer();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {game.name}
      </Typography>

      {match.hostPlayerUsername == player?.username ? (
        <Button sx={{ margin: 'auto' }} size="large" variant="contained">
          Start
        </Button>
      ) : null}
    </Box>
  );
};

export default Knockout;
