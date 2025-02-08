import * as path from "path";

import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {ReflectionService} from "@grpc/reflection";

import {cfg} from "../config/config";
import {DiscordBotServer, DiscordBotService} from "../generated/discord";
import {logger} from "../utils/logger";

import {deleteMessage, getChannels, getGuilds, sendMessage} from "./gRpcServices";
import {apiKeyAuthInterceptor} from "./middleware/authInterceptor";
import {loggingInterceptor} from "./middleware/loggingInterceptor";

/**
 * Creates and configures the gRPC server for the Discord bot API.
 *
 * The server is initialized with interceptors for logging and API key authentication.
 * It registers the DiscordBotService with the service methods:
 *   - getGuilds
 *   - getChannels
 *   - sendMessage
 *   - deleteMessage
 *
 * Additionally, the ReflectionService is set up to enable client reflection (useful for debugging).
 * The server binds to the port specified in the configuration and logs its running status.
 */
const server = new grpc.Server({
    interceptors: [
        loggingInterceptor,
        apiKeyAuthInterceptor
    ]
});

server.addService(DiscordBotService, {
    getGuilds,
    getChannels,
    sendMessage,
    deleteMessage
} as DiscordBotServer);

// log the available gRPC service methods
const serviceMethods = Object.keys(DiscordBotService);
if (serviceMethods.length < 1) {
    logger.error("No gRPC service methods found.");
} else {
    logger.info(`gRPC Server methods: ${serviceMethods.join(", ")}`);
}

const pkg = protoLoader.loadSync(
    path.join(__dirname, "../proto/discord.proto"),
    {
        includeDirs: [path.join(__dirname, "../proto")]
    }
);

logger.info("Loading gRPC reflection service...");
const reflection = new ReflectionService(pkg);
reflection.addToServer(server);

/**
 * Starts the gRPC server by binding it to 0.0.0.0 on the specified port.
 * Logs an error if binding fails, or the port number on success.
 */
export const startServer = () => {
    server.bindAsync(
        `0.0.0.0:${cfg.PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                logger.error("Server binding error:", error);
                return;
            }
            logger.info(`gRPC Server running on port ${port}`);
        }
    );
};
