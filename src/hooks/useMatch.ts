import {
  fetchMatchByCode,
  fetchMatch,
  addPlayerToMatch,
  updateMatch,
} from '../api';

export const useMatch = () => {
  return {
    getMatchByCode: fetchMatchByCode,
    getMatch: fetchMatch,
    addPlayerToMatch,
  };
};
