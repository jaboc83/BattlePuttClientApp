import { fetchPlayerByUsername, createPlayer } from '../api';

const usePlayer = () => {
  return {
    getPlayerByUsername: fetchPlayerByUsername,
    createPlayer: (username: string) => {
      return createPlayer({ username, createdDate: new Date() });
    },
  };
};

export { usePlayer };
