import { fetchAllGames, fetchGameById, fetchGameBySlug } from '../api';

export const useGame = () => {
  return {
    getGames: fetchAllGames,
    getGame: fetchGameById,
    getGameBySlug: fetchGameBySlug,
  };
};
