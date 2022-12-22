import { PerfectPutt } from '../api';
import { useInterval } from './useInterval';
import { usePerfectPutt } from './usePerfectPutt';

export const useWatchPerfectPutt = (
  perfectPutt: PerfectPutt | undefined,
  setMatch: (ko: PerfectPutt) => void,
) => {
  const { getPerfectPutt } = usePerfectPutt();
  useInterval(async () => {
    if (perfectPutt?.matchId) {
      const m = await getPerfectPutt(
        perfectPutt.matchId,
        perfectPutt.lastUpdate,
      );
      setMatch(m);
    }
  }, 1000);
};
