import {handleUnaryCall} from "@grpc/grpc-js";

import {getAllGuilds} from "../../bot/services";
import {BotGuildList,Empty} from "../../generated/discord";


export const getGuilds: handleUnaryCall<Empty, BotGuildList> = async (
    call,
    callback) => {
    const guilds = getAllGuilds();
    callback(null, {guilds});
};
