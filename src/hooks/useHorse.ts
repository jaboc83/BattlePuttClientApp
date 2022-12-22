import {
  fetchHorse,
  updateHorse,
  fetchAllHorseFromUser,
  fetchHorseTopScore,
  StationScore,
  Horse,
} from '../api';

// Start a new horse from a match
const startHorse = async (matchId: string) => {
  // Get the latest horse data
  const currentMatch = await fetchHorse(matchId);

  // Choose a starting player at random
  const randomPlayerIndex = Math.floor(
    Math.random() * currentMatch.players.length,
  );
  currentMatch.currentPlayer = currentMatch.players[randomPlayerIndex].username;
  currentMatch.shotChooser = currentMatch.currentPlayer!;

  // Begin the match timer
  currentMatch.matchStart = new Date();

  // Update the data source
  return updateHorse(currentMatch);
};

const completeTurn = (madeShot: boolean, horse: Horse) => {
  const currentPlayerIndex = horse.players.findIndex(
    p => p.username?.toLowerCase() === horse.currentPlayer?.toLowerCase(),
  );

  // Player needed a make and missed; give em a letter.
  if (
    horse.madeLastShot &&
    horse.shotChooser.toLowerCase() !== horse.currentPlayer?.toLowerCase() &&
    !madeShot
  ) {
    horse.players[currentPlayerIndex].score! += 1;
  }
  // Player needed a make and made it; next player can choose their shot.
  else if (horse.madeLastShot && madeShot) horse.madeLastShot = madeShot;
  // Move to next station if everyone is done with this one. Finish if all are done.
  if (horse.players.filter(p => (p.score || 0) < 5).length === 1) {
    horse.matchComplete = new Date();
  }

  // Check if our game is done.
  if (horse.matchComplete) {
    return updateHorse(horse);
  }

  // Figure out who's turn is next
  let nextPlayerIndex =
    horse.players.findIndex(
      p => p.username?.toLowerCase() === horse.currentPlayer?.toLowerCase(),
    ) + 1;
  const lastPlayerIndex = horse.players.length - 1;
  nextPlayerIndex = nextPlayerIndex > lastPlayerIndex ? 0 : nextPlayerIndex;
  while (
    horse.players!.find(
      p => p.username === horse.players[nextPlayerIndex].username!,
    )?.score === 5
  ) {
    nextPlayerIndex =
      nextPlayerIndex + 1 > lastPlayerIndex ? 0 : nextPlayerIndex + 1;
  }
  const nextPlayer = horse.players[nextPlayerIndex].username!;

  // Player missed the shot so next player becomes the shot chooser
  if (
    !madeShot ||
    (madeShot &&
      horse.madeLastShot &&
      horse.shotChooser.toLowerCase() !== horse.currentPlayer?.toLowerCase())
  ) {
    horse.shotChooser = nextPlayer;
  }
  horse.currentPlayer = nextPlayer;
  horse.madeLastShot = madeShot;

  // Update the DB
  return updateHorse(horse);
};

export const useHorse = () => {
  return {
    getHorse: fetchHorse,
    getAllFromUser: fetchAllHorseFromUser,
    getTopScore: fetchHorseTopScore,
    startHorse,
    completeTurn,
  };
};
