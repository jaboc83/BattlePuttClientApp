import { Box, Typography } from '@mui/material';
import { GameComponentParams } from '../App';
import { useCurrentPlayer } from '../hooks/useCurrentPlayer';

const Knockout: React.FC<GameComponentParams> = ({ game, match }) => {
  const { player } = useCurrentPlayer();
  return (
    <Box sx={{ margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {game.name}
        <Typography
          component="span"
          variant="h4"
          color={'secondary'}
          align="center"
          gutterBottom
        >
          {` ${match.matchCode} `}
        </Typography>
      </Typography>
      {player?.username}
    </Box>
  );
};

export default Knockout;
