import {Guild} from "discord.js";

import {BotGuild} from "../../generated/discord";
import {client} from "../discord";

/**
 * Retrieves all guilds that the bot is currently connected to.
 *
 * Maps through the client's cached guilds, converting each Guild object into a BotGuild object.
 * The resulting object includes details such as the guild's ID, name, member count, owner ID,
 * icon URL (if available), description (if provided), and creation timestamp.
 *
 * @returns An array of BotGuild objects representing the guilds.
 */
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
