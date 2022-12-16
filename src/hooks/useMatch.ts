import { fetchMatchByCode, fetchMatch, addPlayerToMatch } from '../api';

export const useMatch = () => {
  return {
    getMatchByCode: fetchMatchByCode,
    getMatch: fetchMatch,
    addPlayerToMatch,
  };
};
