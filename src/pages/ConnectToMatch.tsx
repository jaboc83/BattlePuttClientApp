import { Box, Button, TextField, Typography } from '@mui/material';
import { Game, Match } from '../api';
import { usePlayer } from '../hooks';
import * as React from 'react';
import { useCurrentPlayer } from '../hooks/useCurrentPlayer';

interface ConnectToMatchProps {
  game: Game;
  match: Match;
}

const ConnectToMatch = ({ game, match }: ConnectToMatchProps) => {
  const [username, setUsername] = React.useState<string | undefined>();
  const { getPlayerByUsername, createPlayer } = usePlayer();
  const { setPlayer } = useCurrentPlayer();
  const submitHandler = () => {
    if (username) {
      console.log('getting player');
      getPlayerByUsername(username)
        .then(player => {
          console.log('got player', player);
          if (player) {
            setPlayer(player);
            return;
          }
          return createPlayer(username);
        })
        .then(player => {
          console.log('got player', player);
          if (player) {
            setPlayer(player);
          }
        })
        .catch(err => console.error(err));
    }
    return false;
  };
  return (
    <Box sx={{ margin: 'auto' }}>
      <Typography sx={{ mb: 2 }} variant="h5" align="center" gutterBottom>
        Join {game.name}
        <Typography
          component="span"
          variant="h5"
          color={'secondary'}
          align="center"
          gutterBottom
        >
          {` ${match.matchCode} `}
        </Typography>
        ?
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <TextField
          id="username"
          margin="none"
          label="Username"
          name="username"
          color="primary"
          sx={{ width: '11rem' }}
          focused
          onChange={event => {
            setUsername(event.target.value);
          }}
        />
        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{ ml: 2, height: '4em' }}
          disabled={username === undefined || username.trim() == ''}
        >
          Join
        </Button>
      </form>
    </Box>
  );
};

export default ConnectToMatch;
