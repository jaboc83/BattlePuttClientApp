import { apiBaseUrl, client } from './apiBase';
import { Match } from './match';

export interface Horse extends Match {
  currentPlayer?: string;
  shotChooser: string;
  madeLastShot: boolean;
}

export const fetchHorse = async (matchId: string, lastUpdate?: Date) => {
  let url = `${apiBaseUrl}/api/horse/${matchId}`;
  if (lastUpdate) {
    url += `?lastUpdate=${encodeURIComponent(lastUpdate.toISOString())}`;
  }
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as Horse;
  }
  throw new Error(results.data);
};

export const fetchAllHorseFromUser = async (username: string) => {
  const url = `${apiBaseUrl}/api/horse?username=${encodeURIComponent(
    username,
  )}`;
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as Array<Horse>;
  }
  throw new Error(results.data);
};

export const fetchHorseTopScore = async () => {
  const url = `${apiBaseUrl}/api/horse?topScore=true`;
  const results = await client.get(url);
  if (results.status === 200) {
    return results.data as Horse;
  }
  throw new Error(results.data);
};

export const updateHorse = async (ko: Horse) => {
  const results = await client.put(`${apiBaseUrl}/api/horse`, ko);
  if (results.status === 200) {
    return results.data as Horse;
  }
  throw new Error(results.data);
};
