import morgan from 'morgan';
import { logger } from '../utils/logger.js';

morgan.token('body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    return JSON.stringify(req.body).substring(0, 200);
  }
  return '-';
});

export const requestLogger = morgan('combined', {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    },
  },
});
