import { Knockout, Player, fetchKnockout, updateKnockout } from '../api';

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
      return updateKnockout(currentMatch);
    },
    completeTurn: (points: number, knockout: Knockout) => {
      const addedPoints = points * (knockout?.distance || 1);
      knockout.players.forEach(p => {
        if (
          p.playerUsername?.toLowerCase() ===
          knockout.currentPlayer?.toLowerCase()
        ) {
          p.score = (p.score || 0) + addedPoints;
        }
      });
      console.log('currentPlayer: ' + knockout.currentPlayer);
      const nextPlayerIndex =
        knockout.players.findIndex(
          p =>
            p.playerUsername?.toLowerCase() ===
            knockout.currentPlayer?.toLowerCase(),
        ) + 1;
      console.log('nextPlayerIndex: ' + nextPlayerIndex);
      const lastPlayerIndex = knockout.players.length - 1;
      console.log('lastPlayerIndex: ' + lastPlayerIndex);
      knockout.currentPlayer =
        nextPlayerIndex > lastPlayerIndex
          ? knockout.players[0].playerUsername
          : knockout.players[nextPlayerIndex].playerUsername;
      return updateKnockout(knockout);
    },
  };
};
