import {Guild} from "discord.js";

import { BotGuild } from "../../generated/discord";
import { client } from "../discord";

export const getAllGuilds = (): BotGuild[] => {
    return client.guilds.cache.map((guild: Guild): BotGuild => ({
        id: guild.id.toString(),
        name: guild.name,
        memberCount: guild.memberCount,
        ownerId: guild.ownerId.toString(),
        icon: guild.iconURL() ?? undefined,
        description: guild.description ?? undefined,
        createdAt: guild.createdAt.toISOString()
    }));
};
