import {readFileSync} from "fs";
import {join} from "path";

import dotenv from "dotenv";

import {envSchema, jsonConfigSchema} from "./configSchemas";

// Load environment variables
dotenv.config();

// Validate environment variables
const envVars = envSchema.parse(process.env);

// Construct the path to the JSON configuration file
const configPath = join(__dirname, "..", "..", "settings", `settings.${envVars.APP_ENV}.json`);

// Read and parse JSON configuration
const rawJsonConfig = readFileSync(configPath, "utf-8");

// Validate JSON configuration
const jsonConfig = jsonConfigSchema.parse(JSON.parse(rawJsonConfig));

// Combine both configurations
export const cfg = {
    ...envVars,
    ...jsonConfig
};




