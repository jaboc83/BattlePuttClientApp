import { Container, CssBaseline, Skeleton } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useFiftyPutts, useGame, useKnockout, useMatch } from './hooks';
import { Footer, Header } from './layout';
import * as React from 'react';
import { Game, Match } from './api';
import ConnectToMatch from './pages/ConnectToMatch';
import { PlayerContext } from './contexts/PlayerContext';
import { Player } from './api/player';
import NotFound from './pages/NotFound';
import KnockoutPage from './pages/Knockout/KnockoutPage';
import { useInterval } from './hooks/useInterval';
import FiftyPuttsPage from './pages/FiftyPutts/FiftyPutts';

export interface GameComponentParams {
  match: Match;
  game: Game;
}

function App() {
  const [searchParams] = useSearchParams();
  const matchId = searchParams.get('matchId')?.toUpperCase();
  const { getMatch } = useMatch();
  const { getGame } = useGame();
  const [match, setMatch] = React.useState<Match | undefined>();
  const [game, setGame] = React.useState<Game | undefined>();
  const [player, setPlayer] = React.useState<Player>({} as Player);
  const { getKnockout } = useKnockout();
  const { getFiftyPutts } = useFiftyPutts();
  const [content, setContent] = React.useState<React.ReactNode>(<></>);

  // Load the match
  React.useEffect(() => {
    const fetchData = async () => {
      if (matchId) {
        const m = await getMatch(matchId);
        setMatch(m);
        const g = await getGame(m?.gameSlug);
        setGame(g);
        if (!matchId) return;

        switch (g?.slug) {
          case 'knockout': {
            const ko = await getKnockout(matchId);
            setContent(<KnockoutPage game={g} knockout={ko} />);
            break;
          }
          case 'fiftyputts': {
            const fp = await getFiftyPutts(matchId);
            setContent(<FiftyPuttsPage game={g} fiftyPutts={fp} />);
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
    if (!player.username || !match || !game || match.matchStart) {
      return;
    }
    const m = await getMatch(match.matchId, match.lastUpdate);
    setMatch(m);
  }, 5000);

  const getContent = () => {
    if (game && match) {
      if (player.username) {
        switch (game?.slug) {
          case 'knockout': {
            return content;
          }
          case 'fiftyputts': {
            return content;
          }
          default: {
            return content;
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
