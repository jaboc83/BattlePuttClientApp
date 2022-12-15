import * as React from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

// Hook that is a thin wrapper around the player context
// used to get info about the current player.
export const useCurrentPlayer = () => React.useContext(PlayerContext);
