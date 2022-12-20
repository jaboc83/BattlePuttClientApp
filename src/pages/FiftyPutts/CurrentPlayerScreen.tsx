import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
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
  const [totalMade, setTotalMade] = React.useState<string | null>();
  const isValidTotalMade = () => {
    return (
      !Number.isNaN(totalMade) &&
      Number(totalMade) >= 0 &&
      Number(totalMade) <= 10
    );
  };

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
        {` ${game.name}`}
      </Typography>
      {isSubmitting ? (
        <Typography variant="h5" color="primary" align="center">
          Submitting...
        </Typography>
      ) : (
        <>
          <Typography variant="h6" align="center" gutterBottom>
            How many putts did you make at{' '}
            {`${fiftyPutts?.distances[fiftyPutts.currentStation]}'`}?
          </Typography>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Button
                variant={madeFirst ? 'contained' : 'outlined'}
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
            <Grid item sm={12} xs={12}>
              <Button
                variant={madeLast ? 'contained' : 'outlined'}
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
            <Grid item xs={12} sm={12}>
              <TextField
                id="totalMade"
                margin="none"
                label="Total Putts Made"
                name="totalMade"
                color="primary"
                sx={{ width: '100%' }}
                defaultValue={null}
                error={totalMade !== undefined && !isValidTotalMade()}
                helperText={
                  totalMade !== undefined && !isValidTotalMade()
                    ? 'Only 10 possible putts can be made'
                    : null
                }
                inputProps={{ maxLength: 2 }}
                onChange={event => {
                  setTotalMade(event.target.value);
                }}
              />
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
                disabled={
                  totalMade === undefined ||
                  totalMade === '' ||
                  !isValidTotalMade()
                }
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
