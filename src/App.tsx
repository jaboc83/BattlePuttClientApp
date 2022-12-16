import { Container, CssBaseline, Skeleton } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useGame, useKnockout, useMatch } from './hooks';
import { Footer, Header } from './layout';
import * as React from 'react';
import { Game, Match } from './api';
import ConnectToMatch from './pages/ConnectToMatch';
import { PlayerContext } from './contexts/PlayerContext';
import { Player } from './api/player';
import NotFound from './pages/NotFound';
import Knockout from './pages/Knockout';
import { useInterval } from './hooks/useInterval';

export interface GameComponentParams {
  match: Match;
  game: Game;
}

function App() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code')?.toUpperCase();
  const { getMatchByCode, getMatch } = useMatch();
  const { getGame } = useGame();
  const [match, setMatch] = React.useState<Match | undefined>();
  const [game, setGame] = React.useState<Game | undefined>();
  const [player, setPlayer] = React.useState<Player>({} as Player);
  const { getKnockout } = useKnockout();
  const [content, setContent] = React.useState<React.ReactNode>(<></>);

  // Load the match
  React.useEffect(() => {
    const fetchData = async () => {
      if (code) {
        const m = await getMatchByCode(code);
        setMatch(m);
        const g = await getGame(m?.gameId);
        setGame(g);
        if (!match?.id) return;

        switch (game?.slug) {
          case 'knockout': {
            const ko = await getKnockout(match?.id);
            setContent(<Knockout game={game} match={ko} />);
            break;
          }
          default: {
            setContent(<NotFound />);
            break;
          }
        }
      }
    };
    fetchData().catch(console.error);
  }, []);

  useInterval(async () => {
    if (!player.id || !match || !game || match.matchStart) {
      return;
    }
    const m = await getMatch(match?.id);
    setMatch(m);
  }, 5000);

  const getContent = () => {
    if (game && match) {
      if (player.username) {
        switch (game?.slug) {
          case 'knockout': {
            return <Knockout game={game} match={match} />;
          }
          default: {
            return <NotFound />;
          }
        }
      }
      return <ConnectToMatch game={game} match={match} />;
    }
    return <Skeleton variant="rectangular" width="15rem" height="15rem" />;
  };

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      <CssBaseline />
      <Header />
      <Container
        component={'main'}
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        {getContent()}
      </Container>
      <Footer />
    </PlayerContext.Provider>
  );
}

export default App;
