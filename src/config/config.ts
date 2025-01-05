import {readFileSync} from "fs";
import {join} from "path";

import dotenv from "dotenv";
import Joi from "joi";

import {EnvVariables, JsonConfig} from "./config.types";


// Load environment variables
dotenv.config();

// Define the valid environments at the start of your code
const VALID_ENVIRONMENTS: string[] = ["dev", "test"];

// Define environment validation schema
const envSchema = Joi.object({
    DISCORD_TOKEN: Joi.string().required(),
    DISCORD_CLIENT_ID: Joi.string().required(),
    APP_ENV: Joi.string().valid(...VALID_ENVIRONMENTS).default("dev"),
    API_KEY: Joi.string().required(),
    PORT: Joi.number().required()
}).unknown();

// Validate and declare environment variables
const {error, value: validatedEnvVars} = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

// Cast the validated environment variables to the EnvConfig type
const envVars: EnvVariables = validatedEnvVars as EnvVariables;

// Reading JSON configuration
const configPath = join(__dirname, "..", "..", "settings", `settings.${envVars.APP_ENV}.json`);
const rawJsonConfig = readFileSync(configPath, "utf-8");
const jsonConfig: JsonConfig = JSON.parse(rawJsonConfig);

// Combine both configurations
export const cfg = {
    ...envVars,
    ...jsonConfig
};
