import {BaseGuildTextChannel, ChannelType, GuildChannel, ThreadOnlyChannel} from "discord.js";

import {BotChannel} from "../../generated/discord";
import {client} from "../discord";

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
                topic: (channel instanceof BaseGuildTextChannel || channel instanceof ThreadOnlyChannel) ? channel.topic ?? undefined : undefined
            };

            return baseInfo;
        });
};
