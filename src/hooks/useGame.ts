import { fetchAllGames, fetchGameById, fetchGameBySlug } from '../api';

const useGame = () => {
  return {
    getGames: fetchAllGames,
    getGame: fetchGameById,
    getGameBySlug: fetchGameBySlug,
  };
};

export { useGame };
