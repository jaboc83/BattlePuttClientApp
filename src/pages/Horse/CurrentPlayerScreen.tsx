import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { Game, Horse, MatchPlayer } from '../../api';
import { useCurrentPlayer, useHorse } from '../../hooks';
import { Box } from '@mui/system';

interface CurrentPlayerScreenProps {
  horse: Horse;
  game: Game;
}

const CurrentPlayerScreen: React.FC<CurrentPlayerScreenProps> = ({
  horse,
  game,
}) => {
  const { completeTurn } = useHorse();
  const { player } = useCurrentPlayer();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [madeShot, setMadeShot] = React.useState<boolean | undefined>();
  const [playerScore, setPlayerScore] = React.useState<
    MatchPlayer | undefined
  >();

  React.useEffect(() => {
    if (isSubmitting) {
      setMadeShot(false);
    }
    setIsSubmitting(false);
  }, [horse]);

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
      <Typography variant="h4" align="center" gutterBottom>
        {` ${game.name}`}
      </Typography>
      <Box marginY={2} textAlign="center">
        <Typography
          component={'span'}
          variant="h3"
          color="secondary"
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
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {player?.username &&
        horse.shotChooser.toLowerCase() === player.username.toLowerCase()
          ? 'Choose your shot.'
          : 'Make it or take a letter.'}
      </Typography>
      {isSubmitting ? (
        <Typography variant="h5" color="primary" align="center">
          Submitting...
        </Typography>
      ) : (
        <>
          <Typography variant="h6" align="center" gutterBottom>
            Did you make your putt?
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Button
                variant={madeShot ? 'contained' : 'outlined'}
                size="large"
                fullWidth={true}
                color={'primary'}
                sx={{
                  height: '5rem',
                  fontSize: 28,
                  fontWeight: 600,
                }}
                onClick={() => {
                  setMadeShot(true);
                }}
              >
                Yes
              </Button>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Button
                variant={madeShot === false ? 'contained' : 'outlined'}
                size="large"
                fullWidth={true}
                color={'primary'}
                sx={{
                  height: '5rem',
                  fontSize: 28,
                  fontWeight: 600,
                }}
                onClick={() => {
                  setMadeShot(false);
                }}
              >
                No
              </Button>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Button
                variant="outlined"
                size="large"
                fullWidth={true}
                color="secondary"
                sx={{
                  height: '5rem',
                  fontSize: 28,
                  fontWeight: 600,
                }}
                disabled={madeShot === undefined}
                onClick={() => {
                  completeTurn(madeShot!, horse);
                  setIsSubmitting(true);
                }}
              >
                Finish Turn
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CurrentPlayerScreen;
