import winston from "winston";

import {cfg} from "../config/config";

// Create an array of transports starting with the Console transport
const transports: winston.transport[] = [
    new winston.transports.Console()
];

// Conditionally add the File transport
if (cfg.logger.logToFile) {
    // Generate a date string in the format YYYY-MM-DD (or customize as needed)
    const date = new Date().toISOString().split("T")[0];
    const filename = `${cfg.logger.logFilePath}/${date}.log`;

    transports.push(
        new winston.transports.File({
            filename,
            level: cfg.logger.fileLogLevel // use file-specific log level from config
        })
    );
}

export const logger = winston.createLogger({
    level: cfg.logger.logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message}) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports
});
