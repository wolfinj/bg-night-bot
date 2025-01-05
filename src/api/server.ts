import path from "path";

import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import {cfg} from "../config/config";

import {deleteMessage, getChannels, sendMessage} from "./services/grpcService";

const PROTO_PATH = path.resolve(__dirname, "../proto/discord.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

interface ProtoDescriptor {
    discord: {
        DiscordBot: grpc.ServiceClientConstructor;
    };
}

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoDescriptor;
const server = new grpc.Server();

server.addService(protoDescriptor.discord.DiscordBot.service, {
    getChannels,
    sendMessage,
    deleteMessage
});

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
