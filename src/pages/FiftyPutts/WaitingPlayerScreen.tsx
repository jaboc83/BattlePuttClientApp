import { Typography } from '@mui/material';
import { FiftyPutts } from '../../api';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useCurrentPlayer, useFiftyPutts } from '../../hooks';

interface FiftyPuttsScore {
  username: string;
  score: number;
  date: Date | undefined;
}
interface WaitingPlayerScreenProps {
  fiftyPutts: FiftyPutts;
}
const WaitingPlayerScreen: React.FC<WaitingPlayerScreenProps> = ({
  fiftyPutts,
}) => {
  const { getAllFromUser, getTopScore } = useFiftyPutts();
  const [recentScores, setRecentScores] =
    React.useState<Array<FiftyPuttsScore | undefined>>();
  const [topScore, setTopScore] = React.useState<FiftyPuttsScore | undefined>();
  const { player } = useCurrentPlayer();

  React.useEffect(() => {
    const loadData = async () => {
      if (player && player.username) {
        const fiftyPuttss = await getAllFromUser(player?.username);
        setRecentScores(
          fiftyPuttss
            .filter(k => k.matchComplete != null)
            .sort((a, b) => {
              return b.matchComplete!.getTime() - a.matchComplete!.getTime();
            })
            .slice(0)
            .map(fp => {
              return {
                username: player.username!,
                score: fp.players!.find(
                  p =>
                    player.username?.toLowerCase() ===
                    p.username?.toLowerCase(),
                )!.score!,
                date: fp.matchComplete!,
              };
            }),
        );
        const topScoreFp = await getTopScore();
        setTopScore({
          date: topScoreFp.matchComplete,
          score: topScoreFp.winningScore,
          username: topScoreFp.players
            .filter(p => p.score === topScoreFp.winningScore)
            .map(p => p.username)
            .join(', '),
        });
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
        {fiftyPutts?.currentPlayer
          ? `It's ${fiftyPutts.currentPlayer}'s turn.`
          : "It's not your turn."}
      </Typography>
      {topScore != null ? (
        <Card sx={{ p: 1, m: 1 }}>
          <CardContent>
            <Typography align="center" variant="h6">
              Top Fifty Putts Score
            </Typography>
            <Typography align="center">
              {`${topScore?.score} points by ${topScore.username} ${
                topScore.date
                  ? `on ${topScore.date?.toLocaleDateString()}`
                  : " and the game isn't finished"
              }`}
            </Typography>
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
