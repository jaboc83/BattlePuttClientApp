import { Box, Button, TextField, Typography } from '@mui/material';
import { Game, Match, Player } from '../api';
import { useMatch, usePlayer } from '../hooks';
import * as React from 'react';
import { useCurrentPlayer } from '../hooks/useCurrentPlayer';

interface ConnectToMatchProps {
  game: Game;
  match: Match;
}

const ConnectToMatch = ({ game, match }: ConnectToMatchProps) => {
  const [username, setUsername] = React.useState<string | undefined>();
  const { createPlayer, getPlayer } = usePlayer();
  const { addPlayerToMatch } = useMatch();
  const { setPlayer } = useCurrentPlayer();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const doWork = async (name: string) => {
      const player = await createPlayer(name);
      // storing input name
      if (player.username) {
        const previousPlayers: Array<string> = JSON.parse(
          localStorage.getItem('previousPlayers') || '[]',
        );
        if (previousPlayers.findIndex(p => p === player.username) == -1) {
          previousPlayers.push(player.username);
          localStorage.setItem(
            'previousPlayers',
            JSON.stringify(previousPlayers),
          );
        }
      }

      addPlayerIfNotExists(match, player);
    };
    if (username) {
      doWork(username).catch(console.error);
    }
  };

  const addPlayerIfNotExists = async (match: Match, player: Player) => {
    // New Player
    if (match.players.findIndex(p => p.username === player.username) === -1) {
      if (match.matchStart != null) {
        throw new Error(
          "Match has already started and can't accept new players",
        );
      }
      await addPlayerToMatch(player, match.matchId);
    }
    setPlayer(player);
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
      <form onSubmit={submitHandler}>
        <Box display="flex" flexDirection="column" margin={2}>
          {(
            JSON.parse(
              localStorage.getItem('previousPlayers') || '[]',
            ) as Array<string>
          ).map(p => {
            return (
              <Button
                key={p}
                sx={{ mb: 1 }}
                size="large"
                variant="contained"
                onClick={async () => {
                  const player = await getPlayer(p);
                  if (player) {
                    await addPlayerIfNotExists(match, player);
                  }
                }}
              >
                {p}
              </Button>
            );
          })}
          <Typography align="center" gutterBottom marginTop={1}>
            Or enter a new user below.
          </Typography>
        </Box>
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
