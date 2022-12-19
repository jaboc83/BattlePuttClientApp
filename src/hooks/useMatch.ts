import { fetchMatch, addPlayerToMatch, updateMatch } from '../api';

export const useMatch = () => {
  return {
    getMatch: fetchMatch,
    addPlayerToMatch,
  };
};
