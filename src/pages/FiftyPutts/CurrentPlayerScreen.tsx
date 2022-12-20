import { Button, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { Game, FiftyPutts } from '../../api';
import { useFiftyPutts } from '../../hooks';

interface CurrentPlayerScreenProps {
  fiftyPutts: FiftyPutts;
  game: Game;
}

const CurrentPlayerScreen: React.FC<CurrentPlayerScreenProps> = ({
  fiftyPutts,
  game,
}) => {
  const { completeTurn } = useFiftyPutts();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [madeFirst, setMadeFirst] = React.useState(false);
  const [madeLast, setMadeLast] = React.useState(false);
  const [totalMade, setTotalMade] = React.useState<number | null>();

  React.useEffect(() => {
    if (isSubmitting) {
      setMadeFirst(false);
      setMadeLast(false);
      setTotalMade(undefined);
    }
    setIsSubmitting(false);
  }, [fiftyPutts]);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {`${fiftyPutts?.distances[fiftyPutts.currentStation]}' ${game.name}`}
      </Typography>
      {isSubmitting ? (
        <Typography variant="h5" color="primary" align="center">
          Submitting...
        </Typography>
      ) : (
        <>
          <Typography variant="h6" align="center" gutterBottom>
            How many putts did you make this round?
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={6}>
              <Button
                variant="contained"
                size="large"
                fullWidth={true}
                color={madeFirst ? 'success' : 'primary'}
                sx={{
                  height: '5rem',
                  fontSize: 28,
                  fontWeight: 600,
                }}
                onClick={() => {
                  setMadeFirst(!madeFirst);
                }}
              >
                Made First
              </Button>
            </Grid>
            <Grid item sm={6} xs={6}>
              <Button
                variant="contained"
                size="large"
                fullWidth={true}
                color={madeLast ? 'success' : 'primary'}
                sx={{
                  height: '5rem',
                  fontSize: 28,
                  fontWeight: 600,
                }}
                onClick={() => {
                  setMadeLast(!madeLast);
                }}
              >
                Made Last
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
                disabled={totalMade === undefined}
                onClick={() => {
                  completeTurn(
                    {
                      madeFirst,
                      madeLast,
                      totalMade: Number(totalMade),
                      username: fiftyPutts.currentPlayer!,
                    },
                    fiftyPutts,
                  );
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
