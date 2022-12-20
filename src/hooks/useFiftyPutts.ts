import {
  FiftyPutts,
  fetchFiftyPutts,
  updateFiftyPutts,
  fetchAllFiftyPuttsFromUser,
  fetchFiftyPuttsTopScore,
  StationScore,
} from '../api';

// Start a new fiftyPutts from a match
const startFiftyPutts = async (matchId: string, distances: Array<number>) => {
  // Get the latest fiftyPutts data
  const currentMatch = await fetchFiftyPutts(matchId);

  // Configure based on host input
  currentMatch.distances = distances;

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
  return updateFiftyPutts(currentMatch);
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
const completeTurn = (score: StationScore, fiftyPutts: FiftyPutts) => {
  const currentPlayerIndex = fiftyPutts.players.findIndex(
    p => p.username?.toLowerCase() === fiftyPutts.currentPlayer?.toLowerCase(),
  );
  // Add the players points to their score
  const addedPoints = calculateStationScore(score, fiftyPutts.currentStation);
  fiftyPutts.stationScores[fiftyPutts.currentStation].push(score);
  fiftyPutts.players[currentPlayerIndex].score! += addedPoints;

  // Move to next station if everyone is done with this one. Finish if all are done.
  if (
    fiftyPutts.stationScores[fiftyPutts.currentStation].length ===
    fiftyPutts.players.length
  ) {
    if (fiftyPutts.currentStation === 4) {
      fiftyPutts.matchComplete = new Date();
    } else {
      fiftyPutts.currentStation += 1;
    }
  }

  // Check if our game is done.
  if (fiftyPutts.matchComplete) {
    fiftyPutts.winningScore = fiftyPutts.players.reduce((total, player) => {
      return Math.max(total, player.score || 0);
    }, 0);
    return updateFiftyPutts(fiftyPutts);
  }

  // Figure out who's turn is next
  let nextPlayerIndex =
    fiftyPutts.players.findIndex(
      p =>
        p.username?.toLowerCase() === fiftyPutts.currentPlayer?.toLowerCase(),
    ) + 1;
  const lastPlayerIndex = fiftyPutts.players.length - 1;
  nextPlayerIndex = nextPlayerIndex > lastPlayerIndex ? 0 : nextPlayerIndex;
  fiftyPutts.currentPlayer = fiftyPutts.players[nextPlayerIndex].username;

  // Update the DB
  return updateFiftyPutts(fiftyPutts);
};
export const useFiftyPutts = () => {
  return {
    getFiftyPutts: fetchFiftyPutts,
    getAllFromUser: fetchAllFiftyPuttsFromUser,
    getTopScore: fetchFiftyPuttsTopScore,
    startFiftyPutts,
    completeTurn,
  };
};
