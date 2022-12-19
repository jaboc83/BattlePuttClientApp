import { fetchPlayer, createPlayer } from '../api';

export const usePlayer = () => {
  return {
    getPlayer: fetchPlayer,
    createPlayer: (username: string) => {
      return createPlayer({ username });
    },
  };
};
