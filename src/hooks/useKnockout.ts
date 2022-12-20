import {
  Knockout,
  fetchKnockout,
  updateKnockout,
  fetchAllKnockoutsFromUser,
  fetchKnockoutTopScore,
} from '../api';

// Start a new knockout from a match
const startKnockout = async (
  matchId: string,
  distance: number,
  numberOfDiscs: number,
) => {
  // Get the latest knockout data
  const currentMatch = await fetchKnockout(matchId);

  // Configure based on host input
  currentMatch.distance = distance;
  currentMatch.numberOfDiscs = numberOfDiscs;
  currentMatch.remainingPutters = currentMatch.remainingPutters ?? {};

  // Choose a starting player at random
  const randomPlayerIndex = Math.floor(
    Math.random() * currentMatch.players.length,
  );
  currentMatch.currentPlayer = currentMatch.players[randomPlayerIndex].username;

  // Set starting putter count for each player
  currentMatch.players.forEach(p => {
    currentMatch.remainingPutters![p.username!] = numberOfDiscs;
  });

  // Begin the match timer
  currentMatch.matchStart = new Date();

  // Update the data source
  return updateKnockout(currentMatch);
};

const completeTurn = (madePutts: number, knockout: Knockout) => {
  // Add the players points to their score
  const addedPoints = madePutts * (knockout?.distance || 1);
  knockout.players.forEach(p => {
    if (p.username?.toLowerCase() === knockout.currentPlayer?.toLowerCase()) {
      p.score = (p.score || 0) + addedPoints;
    }
  });

  // Reduce the remaining putters if needed.
  knockout!.remainingPutters![knockout.currentPlayer!] = madePutts;

  // Check if our game is done.
  const gameFinished = Object.keys(knockout.remainingPutters!).every(user => {
    return knockout.remainingPutters![user] === 0;
  });
  if (gameFinished) {
    knockout.matchComplete = new Date();
    knockout.winningScore = knockout.players.reduce((total, player) => {
      return Math.max(total, player.score || 0);
    }, 0);
    return updateKnockout(knockout);
  }

  // Figure out who's turn is next
  let nextPlayerIndex =
    knockout.players.findIndex(
      p => p.username?.toLowerCase() === knockout.currentPlayer?.toLowerCase(),
    ) + 1;
  const lastPlayerIndex = knockout.players.length - 1;
  nextPlayerIndex = nextPlayerIndex > lastPlayerIndex ? 0 : nextPlayerIndex;
  while (
    knockout.remainingPutters![knockout.players[nextPlayerIndex].username!] ===
    0
  ) {
    nextPlayerIndex =
      nextPlayerIndex + 1 > lastPlayerIndex ? 0 : nextPlayerIndex + 1;
  }
  knockout.currentPlayer = knockout.players[nextPlayerIndex].username;

  // Update the DB
  return updateKnockout(knockout);
};
export const useKnockout = () => {
  return {
    getKnockout: fetchKnockout,
    getAllFromUser: fetchAllKnockoutsFromUser,
    getTopScore: fetchKnockoutTopScore,
    startKnockout,
    completeTurn,
  };
};
