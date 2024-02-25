import logger from "pino";
import dayjs from "dayjs";
import { Request, Response, NextFunction } from "express";


const highlightConfig = {
  projectID: process.env.HIGHLIGHT_PROJECT_ID,
  serviceName: 'logger',
  serviceVersion: 'git-sha',
}

const level = "info";

const pinoLogger = logger({
  enabled: true,
  transport: {
    target: '@highlight-run/pino',
    options: highlightConfig
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () =>
    `, "time": "${dayjs().format("ddd DD, MMMM YYYY-HH:mm:ss")}"`,
});

// write a pino logger middleware
export const pinoLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  pinoLogger.info({ req });
  next();
}

export default pinoLogger;