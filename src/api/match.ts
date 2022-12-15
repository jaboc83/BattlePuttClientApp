import axios from 'axios';
import { apiBaseUrl } from './apiBase';
import { Player } from './players';

export interface Match {
  id: string;
  gameId: string;
  players: Array<Player>;
  matchStart: Date;
  matchComplete: Date;
  code: string;
  hostPlayerId: string;
  battleId: string;
  playersWhoConfirmedScore: Array<string>;
}

const fetchMatchByCode = async (code: string) => {
  const requestConfig = {};
  const results = await axios.get(
    `${apiBaseUrl}/api/match/s/${code}`,
    requestConfig,
  );
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export { fetchMatchByCode };
