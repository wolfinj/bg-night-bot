import {BaseGuildTextChannel, ChannelType, GuildChannel, ThreadOnlyChannel} from "discord.js";

import {BotChannel} from "../../generated/discord";
import {client} from "../discord";

/**
 * Retrieves a list of available channels for a given guild.
 *
 * Filters the client's cached channels to include only those that belong to the specified guild
 * and are not category channels. For each channel, extracts details such as the unique identifier,
 * name, type (both as a number and human-readable string), and topic (if applicable).
 *
 * @param guildId - The Discord Snowflake ID of the guild.
 * @returns An array of BotChannel objects, where each includes:
 *   - id: The channel's unique identifier.
 *   - name: The channel's name.
 *   - type: The channel's type (as a string).
 *   - typeName: A human-readable version of the channel type.
 *   - topic: The channel's topic (if available).
 */
export const getAvailableChannels = (guildId: string): BotChannel[] => {
    return client.channels.cache
        .filter(channel => channel instanceof GuildChannel && channel.guildId === guildId)
        .filter((channel) => channel instanceof GuildChannel && channel.type !== ChannelType.GuildCategory)
        .map(channel => {
            const baseInfo: BotChannel = {
                id: channel.id.toString(),
                name: channel.name,
                type: channel.type.toString(),
                typeName: ChannelType[channel.type],
                topic: (channel instanceof BaseGuildTextChannel || channel instanceof ThreadOnlyChannel)
                    ? channel.topic ?? undefined
                    : undefined
            };

            return baseInfo;
        });
};
