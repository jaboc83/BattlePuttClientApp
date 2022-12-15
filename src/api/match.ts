import axios from 'axios';
import { apiBaseUrl } from './apiBase';

export interface Match {
  id: string;
}

const fetchMatchByCode = async (code: string) => {
  const requestConfig = {};
  const results = await axios.get(
    `${apiBaseUrl}/api/match/${code}`,
    requestConfig,
  );
  if (results.status === 200) {
    return results.data as Match;
  }
  throw new Error(results.data);
};

export { fetchMatchByCode };
