import axios from 'axios';
import { apiBaseUrl } from './apiBase';

export interface Player {
  username?: string;
  playerCreated?: Date;
}

export const fetchPlayer = async (username: string) => {
  const results = await axios.get(`${apiBaseUrl}/api/player/${username}`);
  if (results.status === 200) {
    return results.data as Player;
  }
  if (results.status === 204) {
    return null;
  }
  throw new Error(results.data);
};

export const createPlayer = async (player: Player) => {
  const results = await axios.post(`${apiBaseUrl}/api/player`, player);
  if (results.status === 201 || results.status === 200) {
    return results.data as Player;
  }
  throw new Error(results.data);
};
