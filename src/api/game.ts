import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from './apiBase';

export interface Game {
  id: string;
  name: string;
  maxNumberOfPlayers: number;
  minNumberOfPlayers: number;
  allowTeams: boolean;
  slug: string;
}

export const fetchAllGames = async () => {
  const requestConfig = {};
  const results = await axios.get(`${apiBaseUrl}/api/game`, requestConfig);
  if (results.status === 200) {
    return results.data as Array<Game>;
  }
  throw new Error(results.data);
};

export const fetchGameById = async (id: string) => {
  const requestConfig = {};
  const results = await axios.get(
    `${apiBaseUrl}/api/game/${id}`,
    requestConfig,
  );
  if (results.status === 200) {
    return results.data as Game;
  }
  throw new Error(results.data);
};

export const fetchGameBySlug = async (id: string) => {
  const requestConfig = {};
  const results = await axios.get(
    `${apiBaseUrl}/api/game/s/${id}`,
    requestConfig,
  );
  if (results.status === 200) {
    return results.data as Game;
  }
  throw new Error(results.data);
};
