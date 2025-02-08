import {handleUnaryCall} from "@grpc/grpc-js";

import {getAvailableChannels} from "../../bot/services";
import {BotChannelList, ChannelRequest} from "../../generated/discord";

/**
 * gRPC service method to retrieve the available channels for a specific guild.
 *
 * Uses the guild_id provided in the ChannelRequest to fetch channels from the bot's cache.
 * Returns a BotChannelList containing the channels via the callback.
 *
 * @param call - The gRPC call containing a ChannelRequest.
 * @param callback - The callback function to return a BotChannelList.
 */
export const getChannels: handleUnaryCall<ChannelRequest, BotChannelList> = async (
    call,
    callback) => {
    const channels = getAvailableChannels(call.request.guildId);
    callback(null, {channels});
};
