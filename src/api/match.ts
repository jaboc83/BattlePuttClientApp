import axios from 'axios';
import client, { apiBaseUrl } from './apiBase';
import { Player } from './player';

export interface MatchPlayer {
  [key: string]: string | number | undefined;
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
  lastUpdate: Date;
}

export const fetchMatch = async (matchId: string, lastUpdate?: Date) => {
  let url = `${apiBaseUrl}/api/knockout/${matchId}`;
  if (lastUpdate) {
    url += `?lastUpdate=${encodeURIComponent(lastUpdate.toISOString())}`;
  }
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export const addPlayerToMatch = async (player: Player, matchId: string) => {
  const results = await client.put(
    `${apiBaseUrl}/api/match/addplayer/${matchId}`,
    player,
  );
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export const updateMatch = async (match: Match) => {
  const results = await client.put(`${apiBaseUrl}/api/match`, match);
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};
