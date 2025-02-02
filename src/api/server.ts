import * as path from "path";

import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import {ReflectionService} from "@grpc/reflection";

import {cfg} from "../config/config";
import {DiscordBotServer, DiscordBotService} from "../generated/discord";

import {deleteMessage, getChannels, getGuilds, sendMessage} from "./gRpcServices";
import {apiKeyAuthInterceptor} from "./middleware/authInterceptor";
import {loggingInterceptor} from "./middleware/loggingInterceptor";

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

const pkg = protoLoader.loadSync(path.join(__dirname, "../proto/discord.proto")
    ,
    {
        includeDirs: [path.join(__dirname, "../proto")]
    }
);

const reflection = new ReflectionService(pkg);
reflection.addToServer(server);

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
