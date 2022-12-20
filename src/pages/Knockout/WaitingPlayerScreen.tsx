import { Typography } from '@mui/material';
import { Knockout } from '../../api';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useCurrentPlayer, useKnockout } from '../../hooks';

interface KnockoutScore {
  username: string;
  score: number;
  date: Date | undefined;
}
interface WaitingPlayerScreenProps {
  knockout: Knockout;
}
const WaitingPlayerScreen: React.FC<WaitingPlayerScreenProps> = ({
  knockout,
}) => {
  const { getAllFromUser, getTopScore } = useKnockout();
  const [recentScores, setRecentScores] =
    React.useState<Array<KnockoutScore | undefined>>();
  const [topScore, setTopScore] = React.useState<KnockoutScore | undefined>();
  const { player } = useCurrentPlayer();

  React.useEffect(() => {
    const loadData = async () => {
      if (player && player.username) {
        const knockouts = await getAllFromUser(player?.username);
        setRecentScores(
          knockouts
            .filter(k => k.matchComplete != null)
            .sort((a, b) => {
              return b.matchComplete!.getTime() - a.matchComplete!.getTime();
            })
            .slice(0)
            .map(ko => {
              return {
                username: player.username!,
                score: ko.players!.find(
                  p =>
                    player.username?.toLowerCase() ===
                    p.username?.toLowerCase(),
                )!.score!,
                date: ko.matchComplete!,
              };
            }),
        );
        const topScoreKo = await getTopScore();
        console.log('topScoreKO : ', topScoreKo);
        setTopScore({
          date: topScoreKo.matchComplete,
          score: topScoreKo.winningScore,
          username: topScoreKo.players
            .filter(p => p.score === topScoreKo.winningScore)
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
        {knockout?.currentPlayer
          ? `It's ${knockout.currentPlayer}'s turn.`
          : "It's not your turn."}
      </Typography>
      {topScore != null ? (
        <Card sx={{ p: 1, m: 1 }}>
          <CardContent>
            <Typography align="center" variant="h6">
              Top Knockout Score
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
