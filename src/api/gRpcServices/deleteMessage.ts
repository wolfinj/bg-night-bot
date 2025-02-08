import {handleUnaryCall} from "@grpc/grpc-js";
import * as grpc from "@grpc/grpc-js";

import {deleteChannelMessage} from "../../bot/services";
import {DeleteMessageRequest, DeleteMessageResponse} from "../../generated/discord";

/**
 * gRPC service method to delete a message from a specified channel in a Discord guild.
 *
 * Extracts guildId, channelId, and messageId from the DeleteMessageRequest and calls the
 * deleteChannelMessage service function. The result is then returned via the gRPC callback.
 *
 * @param call - The gRPC call containing a DeleteMessageRequest.
 * @param callback - The callback used to return the DeleteMessageResponse or an error.
 */
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
