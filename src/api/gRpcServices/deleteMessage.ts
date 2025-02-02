import {handleUnaryCall} from "@grpc/grpc-js";
import * as grpc from "@grpc/grpc-js";

import {deleteChannelMessage} from "../../bot/services";
import {DeleteMessageRequest, DeleteMessageResponse} from "../../generated/discord";

export const deleteMessage: handleUnaryCall<DeleteMessageRequest, DeleteMessageResponse> = async (call, callback) => {

    const {guildId, channelId, messageId} = call.request;

    try {
        const result = await deleteChannelMessage(guildId, channelId, messageId);
        callback(null, result);
    } catch (error) {
        if (error instanceof Error) {
            callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: error.message
            });
        } else {
            callback({
                code: grpc.status.INTERNAL,
                message: "An unexpected error occurred"
            });
        }
    }
};
