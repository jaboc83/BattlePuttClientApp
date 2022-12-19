import { Knockout } from '../api';
import { useInterval } from './useInterval';
import { useKnockout } from './useKnockout';

export const useWatchKnockout = (
  knockout: Knockout | undefined,
  setMatch: (ko: Knockout) => void,
) => {
  const { getKnockout } = useKnockout();
  useInterval(async () => {
    if (knockout?.matchId) {
      const m = await getKnockout(knockout.matchId, knockout.lastUpdate);
      setMatch(m);
    }
  }, 1000);
};
