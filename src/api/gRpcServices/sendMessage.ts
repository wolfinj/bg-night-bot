import {ServerUnaryCall, handleUnaryCall, sendUnaryData} from "@grpc/grpc-js";
import * as grpc from "@grpc/grpc-js";

import {sendChannelMessage} from "../../bot/services";
import {MessageResponse, SendMessageRequest} from "../../generated/discord";

/**
 * gRPC service method to send a message to a Discord channel.
 *
 * Extracts guildId, channelId, and content from the SendMessageRequest provided in the gRPC call.
 * Uses the sendChannelMessage service method to send the message and returns the response via the callback.
 *
 * @param call - The gRPC call containing a SendMessageRequest.
 * @param callback - The callback function to return a MessageResponse or an error.
 */
export const sendMessage: handleUnaryCall<SendMessageRequest, MessageResponse> = async (
    call: ServerUnaryCall<SendMessageRequest, MessageResponse>,
    callback: sendUnaryData<MessageResponse>) => {

    const {guildId, channelId, content} = call.request;

    try {
        const result = await sendChannelMessage(guildId, channelId, content);
        console.log("Result:", result);
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
