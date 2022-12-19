import axios from 'axios';
import { apiBaseUrl } from './apiBase';
import { Player } from './player';

export interface MatchPlayer {
  username?: string;
  score?: number;
}

export interface Match {
  matchId: string;
  battleCode: string;
  gameSlug: string;
  matchCode: string;
  matchCreated: Date;
  matchStart?: Date;
  matchComplete?: Date;
  players: Array<MatchPlayer>;
  hostPlayerUsername?: string;
  playersWhoConfirmedScore: Array<string>;
  lastUpdate: Date;
}

export const fetchMatch = async (matchId: string, lastUpdate?: Date) => {
  let url = `${apiBaseUrl}/api/knockout/${matchId}`;
  if (lastUpdate) {
    url += `?lastUpdate=${encodeURIComponent(lastUpdate.toString())}`;
  }
  const results = await axios.get(url);
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export const addPlayerToMatch = async (player: Player, matchId: string) => {
  const results = await axios.put(
    `${apiBaseUrl}/api/match/addplayer/${matchId}`,
    player,
  );
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export const updateMatch = async (match: Match) => {
  const results = await axios.put(`${apiBaseUrl}/api/match`, match);
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};
