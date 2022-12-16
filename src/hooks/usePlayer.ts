import { fetchPlayerByUsername, createPlayer } from '../api';

export const usePlayer = () => {
  return {
    getPlayerByUsername: fetchPlayerByUsername,
    createPlayer: (username: string) => {
      return createPlayer({ username, createdDate: new Date() });
    },
  };
};
