import * as grpc from "@grpc/grpc-js";

import {deleteChannelMessage, getAvailableChannels, sendChannelMessage} from "../../bot/services/messageService";
import { auth } from '../middleware/authMiddleware';
import {ServerWritableStreamImpl} from "@grpc/grpc-js/build/src/server-call";

export const getChannels = async (call: ServerWritableStreamImpl, any>, callback: any) => {
    if (!await auth(call, callback)) return;
    const channels = getAvailableChannels();
    callback(null, { channels });
};

export const sendMessage = async (call: any, callback: any) => {
    const {channel_id, content} = call.request;

    try {
        const result = await sendChannelMessage(channel_id, content);
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

export const deleteMessage = async (call: any, callback: any) => {
    const {channel_id, message_id} = call.request;

    try {
        const result = await deleteChannelMessage(channel_id, message_id);
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

