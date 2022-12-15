export const apiBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://localhost:3001'
    : 'https://battle-putt-api.azurewebsites.net';
