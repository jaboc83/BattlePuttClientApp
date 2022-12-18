import { Knockout, fetchKnockout, updateKnockout } from '../api';
import * as routes from '../routes';

export const useKnockout = () => {
  return {
    getKnockout: fetchKnockout,
    startKnockout: async (
      matchId: string,
      distance: number,
      numberOfDiscs: number,
    ) => {
      const currentMatch = await fetchKnockout(matchId);
      currentMatch.distance = distance;
      currentMatch.numberOfDiscs = numberOfDiscs;
      const randomPlayerIndex = Math.floor(
        Math.random() * currentMatch.players.length,
      );
      currentMatch.matchStart = new Date();
      currentMatch.currentPlayer =
        currentMatch.players[randomPlayerIndex].playerUsername;
      currentMatch.remainingPutters = currentMatch.remainingPutters ?? {};
      currentMatch.players.forEach(p => {
        currentMatch.remainingPutters![currentMatch.currentPlayer!] =
          numberOfDiscs;
      });
      return updateKnockout(currentMatch);
    },
    completeTurn: (madePutts: number, knockout: Knockout) => {
      // Add the players points to their score
      const addedPoints = madePutts * (knockout?.distance || 1);
      knockout.players.forEach(p => {
        if (
          p.playerUsername?.toLowerCase() ===
          knockout.currentPlayer?.toLowerCase()
        ) {
          p.score = (p.score || 0) + addedPoints;
        }
      });

      // Reduce the remaining putters if needed.
      knockout!.remainingPutters![knockout.currentPlayer!] = madePutts;

      // Check if our game is done.
      const gameFinished = Object.keys(knockout.remainingPutters!).every(
        user => {
          return knockout.remainingPutters![user] === 0;
        },
      );
      if (gameFinished) {
        knockout.matchComplete = new Date();
        return updateKnockout(knockout);
      }

      // Figure out who's turn is next
      let nextPlayerIndex =
        knockout.players.findIndex(
          p =>
            p.playerUsername?.toLowerCase() ===
            knockout.currentPlayer?.toLowerCase(),
        ) + 1;
      const lastPlayerIndex = knockout.players.length - 1;
      nextPlayerIndex = nextPlayerIndex > lastPlayerIndex ? 0 : nextPlayerIndex;
      while (
        knockout.remainingPutters![
          knockout.players[nextPlayerIndex].playerUsername!
        ] === 0
      ) {
        nextPlayerIndex =
          nextPlayerIndex + 1 > lastPlayerIndex ? 0 : nextPlayerIndex + 1;
      }
      knockout.currentPlayer = knockout.players[nextPlayerIndex].playerUsername;
      knockout.lastUpdate = new Date();

      // Update the DB
      return updateKnockout(knockout);
    },
  };
};
