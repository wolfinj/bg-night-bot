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
        winston.format.metadata({fillExcept: ["message", "level", "timestamp"]}),
        winston.format.timestamp(),
        winston.format.printf((info) => {
            // Define proper types for the log info
            const { timestamp, level, message, metadata } = info as {
                timestamp: string;
                level: string;
                message: string;
                metadata: { data?: unknown };
            };

            const meta = metadata.data ? `${JSON.stringify(metadata.data)}` : '';
            return `[${timestamp}] ${level}: ${message} ${meta}`;
        })
    ),
    transports
});
