import { Container, CssBaseline, Skeleton } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useGame, useMatch } from './hooks';
import { Footer, Header } from './layout';
import * as React from 'react';
import { Game, Match } from './api';
import ConnectToMatch from './pages/ConnectToMatch';
import { PlayerContext } from './contexts/PlayerContext';
import { Player } from './api/player';
import NotFound from './pages/NotFound';
import Knockout from './pages/Knockout';

export interface GameComponentParams {
  match: Match;
  game: Game;
}

function App() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { getMatchByCode } = useMatch();
  const { getGame } = useGame();
  const [match, setMatch] = React.useState<Match | undefined>();
  const [game, setGame] = React.useState<Game | undefined>();
  const [player, setPlayer] = React.useState<Player>({} as Player);

  // Load the match
  React.useEffect(() => {
    if (code) {
      getMatchByCode(code).then(m => {
        setMatch(m);
      });
    }
  }, []);

  // Load the game
  React.useEffect(() => {
    if (match) {
      getGame(match.gameId).then(g => {
        setGame(g);
      });
    }
  }, [match]);

  const getContent = () => {
    if (game && match) {
      if (player.username) {
        switch (game?.slug) {
          case 'knockout':
            return <Knockout game={game} match={match} />;
          default:
            return <NotFound />;
        }
      }
      return <ConnectToMatch game={game} match={match} />;
    }
    return <Skeleton variant="rectangular" width="15rem" height="15rem" />;
  };

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      <CssBaseline />
      <Container maxWidth="md">
        <Header />
        <Container
          component={'main'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          {getContent()}
        </Container>
        <Footer />
      </Container>
    </PlayerContext.Provider>
  );
}

export default App;
