import axios from 'axios';
import { isValid, parseJSON } from 'date-fns';

export const client = axios.create({});

client.interceptors.response.use(originalResponse => {
  handleDates(originalResponse.data);
  return originalResponse;
});

export default client;
export const apiBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://localhost:3001'
    : 'https://battle-putt-api.azurewebsites.net';

const isDate = function (value: any): boolean {
  return value && typeof value === 'string' && isValid(parseJSON(value));
};

export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== 'object')
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isDate(value)) body[key] = parseJSON(value);
    else if (typeof value === 'object') handleDates(value);
  }
}
