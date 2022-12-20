import { apiBaseUrl, client } from './apiBase';
import { Match } from './match';

export interface StationScore {
  username: string;
  madeFirst: boolean;
  madeLast: boolean;
  totalMade: number;
}

export interface FiftyPutts extends Match {
  currentPlayer?: string;
  currentStation: number;
  distances: Array<number>;
  stationScores: Array<Array<StationScore>>;
  winningScore: number;
}

export const fetchFiftyPutts = async (matchId: string, lastUpdate?: Date) => {
  let url = `${apiBaseUrl}/api/fiftyPutts/${matchId}`;
  if (lastUpdate) {
    url += `?lastUpdate=${encodeURIComponent(lastUpdate.toISOString())}`;
  }
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as FiftyPutts;
  }
  throw new Error(results.data);
};

export const fetchAllFiftyPuttsFromUser = async (username: string) => {
  const url = `${apiBaseUrl}/api/fiftyPutts?username=${encodeURIComponent(
    username,
  )}`;
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as Array<FiftyPutts>;
  }
  throw new Error(results.data);
};

export const fetchFiftyPuttsTopScore = async () => {
  const url = `${apiBaseUrl}/api/fiftyPutts?topScore=true`;
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as FiftyPutts;
  }
  throw new Error(results.data);
};

export const updateFiftyPutts = async (ko: FiftyPutts) => {
  const results = await client.put(`${apiBaseUrl}/api/fiftyPutts`, ko);
  if (results.status === 200) {
    return results.data as FiftyPutts;
  }
  throw new Error(results.data);
};
