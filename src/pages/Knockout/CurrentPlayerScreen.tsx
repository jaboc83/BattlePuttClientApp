import { Button, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { Game, Knockout } from '../../api';
import { useKnockout } from '../../hooks';

interface CurrentPlayerScreenProps {
  knockout: Knockout;
  game: Game;
}

const CurrentPlayerScreen: React.FC<CurrentPlayerScreenProps> = ({
  knockout,
  game,
}) => {
  const { completeTurn } = useKnockout();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setIsSubmitting(false);
  }, [knockout]);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {`${knockout?.distance}' ${game.name}`}
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
            {Array.from(
              Array(
                (knockout.remainingPutters![knockout.currentPlayer!] || 5) + 1,
              ).keys(),
            )
              .map(x => x)
              .map(g => (
                <Grid key={g} item sm={6} xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth={true}
                    sx={{ height: '5rem', fontSize: 28, fontWeight: 600 }}
                    onClick={() => {
                      completeTurn(g, knockout);
                      setIsSubmitting(true);
                    }}
                  >
                    {g}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default CurrentPlayerScreen;
