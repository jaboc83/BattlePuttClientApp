import { fetchMatchByCode } from '../api';

const useMatch = () => {
  return {
    getMatchByCode: fetchMatchByCode,
  };
};

export { useMatch };
