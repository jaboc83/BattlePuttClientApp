export const battleCodeLength = 8;
export const gameCodeLength = 4;
export const generateNewCode = (length: number) => {
  // Declare all characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Pick characers randomly
  let str = '';
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};
