import {handleUnaryCall} from "@grpc/grpc-js";

import {getAllGuilds} from "../../bot/services";
import {BotGuildList, Empty} from "../../generated/discord";

/**
 * gRPC service method to retrieve the list of guilds the bot is connected to.
 *
 * Fetches guilds from the bot’s cache using getAllGuilds() and returns a BotGuildList via the callback.
 *
 * @param call - The gRPC call containing an Empty request.
 * @param callback - The callback function to return a BotGuildList.
 */
export const getGuilds: handleUnaryCall<Empty, BotGuildList> = async (
    call,
    callback) => {
    const guilds = getAllGuilds();
    callback(null, {guilds});
};
