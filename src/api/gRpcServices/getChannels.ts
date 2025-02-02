import {handleUnaryCall} from "@grpc/grpc-js";

import {getAvailableChannels} from "../../bot/services";
import {BotChannelList, ChannelRequest} from "../../generated/discord";

export const getChannels: handleUnaryCall<ChannelRequest, BotChannelList> = async (
    call,
    callback) => {
    const channels = getAvailableChannels(call.request.guildId);
    callback(null, {channels});
};
