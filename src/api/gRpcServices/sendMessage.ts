import {ServerUnaryCall, handleUnaryCall, sendUnaryData} from "@grpc/grpc-js";
import * as grpc from "@grpc/grpc-js";

import {sendChannelMessage} from "../../bot/services";
import {MessageResponse, SendMessageRequest} from "../../generated/discord";

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
