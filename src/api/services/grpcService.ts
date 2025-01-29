import * as grpc from "@grpc/grpc-js";
import {ServerUnaryCall, handleUnaryCall, sendUnaryData} from "@grpc/grpc-js";

import {deleteChannelMessage, getAvailableChannels, sendChannelMessage} from "../../bot/services/messageService";
import {
    ChannelList,
    DeleteMessageRequest,
    DeleteMessageResponse,
    Empty,
    MessageRequest,
    MessageResponse
} from "../../generated/discord";
import {auth} from "../middleware/authMiddleware";


export const getChannels: handleUnaryCall<Empty, ChannelList> = async (
    call,
    callback) => {
    if (!await auth<Empty, ChannelList>(call, callback)) return;
    const channels = getAvailableChannels();
    callback(null, {channels});
};

export const sendMessage: handleUnaryCall<MessageRequest, MessageResponse> = async (
    call: ServerUnaryCall<MessageRequest, MessageResponse>,
    callback: sendUnaryData<MessageResponse>) => {
    if (!await auth<MessageRequest, MessageResponse>(call, callback)) return;

    const {channelId, content} = call.request;

    try {
        const result = await sendChannelMessage(channelId, content);
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

export const deleteMessage: handleUnaryCall<DeleteMessageRequest, DeleteMessageResponse> = async (call, callback) => {
    if (!await auth<DeleteMessageRequest, DeleteMessageResponse>(call, callback)) return;

    const {channelId, messageId} = call.request;

    try {
        const result = await deleteChannelMessage(channelId, messageId);
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

