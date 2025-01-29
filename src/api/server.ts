import * as grpc from "@grpc/grpc-js";

import {cfg} from "../config/config";
import {DiscordBotServer, DiscordBotService} from "../generated/discord"; // Import generated service types

import {deleteMessage, getChannels, sendMessage} from "./services/grpcService";

const server = new grpc.Server();

server.addService(DiscordBotService, {
    getChannels,
    sendMessage,
    deleteMessage
} as DiscordBotServer);

export const startServer = () => {
    server.bindAsync(
        `0.0.0.0:${cfg.PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log(`gRPC Server running on port ${port}`);
        }
    );
};
