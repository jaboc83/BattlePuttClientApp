import { Typography } from '@mui/material';
import { PerfectPutt } from '../../api';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useCurrentPlayer, usePerfectPutt } from '../../hooks';

interface PerfectPuttScore {
  username: string;
  score: number;
  date: Date | undefined;
}
interface WaitingPlayerScreenProps {
  perfectPutt: PerfectPutt;
}
const WaitingPlayerScreen: React.FC<WaitingPlayerScreenProps> = ({
  perfectPutt,
}) => {
  const { getAllFromUser, getTopScore } = usePerfectPutt();
  const [recentScores, setRecentScores] =
    React.useState<Array<PerfectPuttScore | undefined>>();
  const [topScore, setTopScore] = React.useState<
    PerfectPuttScore | undefined
  >();
  const { player } = useCurrentPlayer();

  React.useEffect(() => {
    const loadData = async () => {
      if (player && player.username) {
        const perfectPutts = await getAllFromUser(player?.username);
        setRecentScores(
          perfectPutts
            .filter(k => k.matchComplete != null)
            .sort((a, b) => {
              return b.matchComplete!.getTime() - a.matchComplete!.getTime();
            })
            .slice(0)
            .map(pp => {
              return {
                username: player.username!,
                score: pp.players!.find(
                  p =>
                    player.username?.toLowerCase() ===
                    p.username?.toLowerCase(),
                )!.score!,
                date: pp.matchComplete!,
              };
            }),
        );
        const topScoreFp = await getTopScore();
        if (topScoreFp) {
          setTopScore({
            date: topScoreFp.matchComplete,
            score: topScoreFp.winningScore,
            username: topScoreFp.players
              .filter(p => p.score === topScoreFp.winningScore)
              .map(p => p.username)
              .join(', '),
          });
        }
      }
    };
    loadData().catch(console.error);
  }, [player]);
  return (
    <>
      <Typography
        color="secondary"
        fontStyle="italic"
        variant="h4"
        align="center"
        gutterBottom
      >
        {perfectPutt?.currentPlayer
          ? `It's ${perfectPutt.currentPlayer}'s turn.`
          : "It's not your turn."}
      </Typography>
      {topScore != null ? (
        <Card sx={{ p: 1, m: 1 }}>
          <CardContent>
            <Typography align="center" variant="h6">
              Top Fifty Putts Score
            </Typography>
            <Typography align="center">
              {`${topScore?.score} points by ${
                topScore.username
              } on ${topScore.date?.toLocaleDateString()}`}
            </Typography>{' '}
          </CardContent>
        </Card>
      ) : null}
      {recentScores != null ? (
        <Card sx={{ p: 1, m: 1 }}>
          <CardContent>
            <Typography align="center" variant="h6">
              Your Recent Scores
            </Typography>
            {recentScores.map(score => (
              <Typography
                align="center"
                key={score!.date?.toISOString() || new Date().toISOString()}
              >{`${
                score!.score
              } points on ${score!.date!.toLocaleDateString()}`}</Typography>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};

export default WaitingPlayerScreen;
