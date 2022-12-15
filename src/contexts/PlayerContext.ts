import { Player } from '../api/player';
import * as React from 'react';
interface IPlayerContext {
  player: Player | null;
  setPlayer: (p: Player) => void;
}
export const PlayerContext = React.createContext<IPlayerContext>({
  player: null,
  setPlayer: () => {
    return;
  },
});
