import {
  fetchPerfectPutt,
  updatePerfectPutt,
  fetchAllPerfectPuttFromUser,
  fetchPerfectPuttTopScore,
  StationScore,
  PerfectPutt,
} from '../api';

// Start a new perfectPutt from a match
const startPerfectPutt = async (
  matchId: string,
  distances: Array<number>,
  numberOfDiscs: number,
) => {
  // Get the latest perfectPutt data
  const currentMatch = await fetchPerfectPutt(matchId);

  // Configure based on host input
  currentMatch.distances = distances;
  currentMatch.numberOfDiscs = numberOfDiscs;

  // Setup the 5 stations
  currentMatch.stationScores = Array.from(Array(5).keys()).map(x => []);

  // Choose a starting player at random
  const randomPlayerIndex = Math.floor(
    Math.random() * currentMatch.players.length,
  );
  currentMatch.currentPlayer = currentMatch.players[randomPlayerIndex].username;

  // Begin the match timer
  currentMatch.matchStart = new Date();

  // Update the data source
  return updatePerfectPutt(currentMatch);
};

const calculateStationScore = (score: StationScore, currentStation: number) => {
  const scoreBonuses: Array<{
    first: number;
    last: number;
    all: number;
  }> = [
    { first: 2, last: 1, all: 6 },
    { first: 2, last: 1, all: 7 },
    { first: 4, last: 2, all: 9 },
    { first: 6, last: 3, all: 11 },
    { first: 8, last: 4, all: 14 },
  ];
  let points = score.totalMade;
  const bonuses = scoreBonuses[currentStation];
  if (score.madeFirst) points += bonuses.first;
  if (score.madeLast) points += bonuses.last;
  if (score.totalMade === 10) points += bonuses.all;
  return points;
};
const completeTurn = (score: StationScore, perfectPutt: PerfectPutt) => {
  const currentPlayerIndex = perfectPutt.players.findIndex(
    p => p.username?.toLowerCase() === perfectPutt.currentPlayer?.toLowerCase(),
  );
  // Add the players points to their score
  const addedPoints = calculateStationScore(score, perfectPutt.currentStation);
  perfectPutt.stationScores[perfectPutt.currentStation].push(score);
  perfectPutt.players[currentPlayerIndex].score! += addedPoints;

  // Move to next station if everyone is done with this one. Finish if all are done.
  if (
    perfectPutt.stationScores[perfectPutt.currentStation].length ===
    perfectPutt.players.length
  ) {
    if (perfectPutt.currentStation === 4) {
      perfectPutt.matchComplete = new Date();
    } else {
      perfectPutt.currentStation += 1;
    }
  }

  // Check if our game is done.
  if (perfectPutt.matchComplete) {
    perfectPutt.winningScore = perfectPutt.players.reduce((total, player) => {
      return Math.max(total, player.score || 0);
    }, 0);
    return updatePerfectPutt(perfectPutt);
  }

  // Figure out who's turn is next
  let nextPlayerIndex =
    perfectPutt.players.findIndex(
      p =>
        p.username?.toLowerCase() === perfectPutt.currentPlayer?.toLowerCase(),
    ) + 1;
  const lastPlayerIndex = perfectPutt.players.length - 1;
  nextPlayerIndex = nextPlayerIndex > lastPlayerIndex ? 0 : nextPlayerIndex;
  perfectPutt.currentPlayer = perfectPutt.players[nextPlayerIndex].username;

  // Update the DB
  return updatePerfectPutt(perfectPutt);
};
export const usePerfectPutt = () => {
  return {
    getPerfectPutt: fetchPerfectPutt,
    getAllFromUser: fetchAllPerfectPuttFromUser,
    getTopScore: fetchPerfectPuttTopScore,
    startPerfectPutt,
    completeTurn,
  };
};
