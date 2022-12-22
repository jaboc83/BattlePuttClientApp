import { apiBaseUrl, client } from './apiBase';
import { Match } from './match';

export interface StationScore {
  username: string;
  madeFirst: boolean;
  madeLast: boolean;
  totalMade: number;
}

export interface PerfectPutt extends Match {
  currentPlayer?: string;
  currentStation: number;
  distances: Array<number>;
  stationScores: Array<Array<StationScore>>;
  winningScore: number;
  numberOfDiscs: number;
}

export const fetchPerfectPutt = async (matchId: string, lastUpdate?: Date) => {
  let url = `${apiBaseUrl}/api/perfectPutt/${matchId}`;
  if (lastUpdate) {
    url += `?lastUpdate=${encodeURIComponent(lastUpdate.toISOString())}`;
  }
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as PerfectPutt;
  }
  throw new Error(results.data);
};

export const fetchAllPerfectPuttFromUser = async (username: string) => {
  const url = `${apiBaseUrl}/api/perfectPutt?username=${encodeURIComponent(
    username,
  )}`;
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as Array<PerfectPutt>;
  }
  throw new Error(results.data);
};

export const fetchPerfectPuttTopScore = async () => {
  const url = `${apiBaseUrl}/api/perfectPutt?topScore=true`;
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as PerfectPutt;
  }
  throw new Error(results.data);
};

export const updatePerfectPutt = async (ko: PerfectPutt) => {
  const results = await client.put(`${apiBaseUrl}/api/perfectPutt`, ko);
  if (results.status === 200) {
    return results.data as PerfectPutt;
  }
  throw new Error(results.data);
};
