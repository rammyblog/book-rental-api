import expressPino from 'express-pino-logger';
import dayjs from 'dayjs';

export const logRequest = expressPino({
  level: 'info',
  enabled: true,
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      user: req.raw.user,
      timestamp: `"${dayjs().format()}`,
    }),
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
