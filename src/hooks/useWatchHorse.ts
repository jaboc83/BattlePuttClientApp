import { Horse } from '../api';
import { useInterval } from './useInterval';
import { useHorse } from './useHorse';

export const useWatchHorse = (
  horse: Horse | undefined,
  setMatch: (ko: Horse) => void,
) => {
  const { getHorse } = useHorse();
  useInterval(async () => {
    if (horse?.matchId) {
      const m = await getHorse(horse.matchId, horse.lastUpdate);
      setMatch(m);
    }
  }, 1000);
};
