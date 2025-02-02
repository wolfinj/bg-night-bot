import {z} from "zod";

export const VALID_ENVIRONMENTS = ["dev", "test"] as const;
export const VALID_LOG_LEVELS = ["error", "warn", "info", "http", "verbose", "debug", "silly"] as const;

export const envSchema = z.object({
    DISCORD_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    APP_ENV: z.enum(VALID_ENVIRONMENTS).default("dev"),
    API_KEY: z.string(),
    PORT: z.coerce.number()
});

export const loggerSchema = z.object({
    logLevel: z.enum(VALID_LOG_LEVELS),
    logToFile: z.boolean(),
    logFilePath: z.string(),
    fileLogLevel: z.enum(VALID_LOG_LEVELS)
});

export const jsonConfigSchema = z.object({
    bggApiUrl: z.string().url(),
    logger: loggerSchema
});
