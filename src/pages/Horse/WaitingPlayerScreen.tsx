import { Box, Typography } from '@mui/material';
import { Horse, MatchPlayer } from '../../api';
import * as React from 'react';
import { useCurrentPlayer } from '../../hooks';

interface WaitingPlayerScreenProps {
  horse: Horse;
}
const WaitingPlayerScreen: React.FC<WaitingPlayerScreenProps> = ({ horse }) => {
  const { player } = useCurrentPlayer();
  const [playerScore, setPlayerScore] = React.useState<
    MatchPlayer | undefined
  >();

  React.useEffect(() => {
    if (horse) {
      setPlayerScore(
        horse.players.find(
          p => p.username?.toLowerCase() === player?.username?.toLowerCase(),
        ),
      );
    }
  }, [player]);

  return (
    <>
      <Box marginY={2} textAlign="center">
        <Typography
          component={'span'}
          variant="h3"
          color="primary"
          sx={{ letterSpacing: 8 }}
        >
          {playerScore?.score
            ? Array.from(Array(playerScore.score).keys())
                .reduce((word: Array<string>, curr: number) => {
                  word.push('HORSE'[curr]);
                  return word;
                }, [])
                .join('')
            : null}
        </Typography>
        <Typography
          component={'span'}
          variant="h3"
          color="#444"
          sx={{ letterSpacing: 8 }}
        >
          {Array.from(Array(5 - (playerScore?.score || 0)).keys())
            .reduce((word: Array<string>, curr: number) => {
              word.push('HORSE'[curr + (playerScore?.score || 0)]);
              return word;
            }, [])
            .join('')}
        </Typography>
      </Box>
      <Typography
        color="secondary"
        fontStyle="italic"
        variant="h4"
        align="center"
        gutterBottom
      >
        {horse?.currentPlayer
          ? `It's ${horse.currentPlayer}'s turn.`
          : "It's not your turn."}
      </Typography>
    </>
  );
};

export default WaitingPlayerScreen;
