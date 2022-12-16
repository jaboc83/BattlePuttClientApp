import axios from 'axios';
import { apiBaseUrl } from './apiBase';
import { Player } from './player';

export interface MatchPlayer {
  id?: string;
  playerUsername?: string;
  score?: number;
}

export interface Match {
  id: string;
  gameId: string;
  players: Array<MatchPlayer>;
  matchCreated: Date;
  matchStart: Date;
  matchComplete: Date;
  lastUpdate: Date;
  matchCode: string;
  hostPlayerUsername: string;
  battleId: string;
  playersWhoConfirmedScore: Array<string>;
}

export const fetchMatch = async (id: string) => {
  const results = await axios.get(`${apiBaseUrl}/api/match/${id}`);
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export const fetchMatchByCode = async (code: string) => {
  const results = await axios.get(`${apiBaseUrl}/api/match/s/${code}`);
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
    return results.data as Player;
  }
  throw new Error(results.data);
};

export const updateMatch = async (match: Match) => {
  const results = await axios.put(`${apiBaseUrl}/api/match/${match.id}`, match);
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};
