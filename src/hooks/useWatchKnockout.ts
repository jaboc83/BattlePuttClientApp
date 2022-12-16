import { Knockout } from '../api';
import { useInterval } from './useInterval';
import { useKnockout } from './useKnockout';

export const useWatchKnockout = (
  knockout: Knockout | undefined,
  setMatch: (ko: Knockout) => void,
) => {
  const { getKnockout } = useKnockout();
  useInterval(async () => {
    if (knockout?.id) {
      const m = await getKnockout(knockout.id);
      setMatch(m);
    }
  }, 5000);
};
