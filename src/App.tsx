import { Container, CssBaseline, Skeleton } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useGame, useMatch } from './hooks';
import { Footer, Header } from './layout';
import * as React from 'react';
import { Game, Match } from './api';
import Knockout from './pages/Knockout';
import NotFound from './pages/NotFound';

export interface GameComponentParams {
  match: Match;
  game: Game;
}

function App() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const code = searchParams.get('code');
  const { getMatchByCode } = useMatch();
  const { getGame } = useGame();
  const [match, setMatch] = React.useState<Match | undefined>();
  const [game, setGame] = React.useState<Game | undefined>();

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

  const getGameComponent = () => {
    if (game && match) {
      switch (game?.slug) {
        case 'knockout':
          return <Knockout game={game} match={match} />;
        default:
          return <NotFound />;
      }
    }
    return <Skeleton variant="rectangular" width="12em" height="12em" />;
  };

  return (
    <>
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
          {getGameComponent()}
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default App;
