import {TextChannel} from "discord.js";

import {client} from "../discord";

export const deleteChannelMessage = async (guildId: string, channelId: string, messageId: string) => {
    // const guild = await client.guilds.fetch(guildId).catch();
    const channel = await client.channels.fetch(channelId);
    if (channel instanceof TextChannel) {
        const message = await channel.messages.fetch(messageId);
        await message.delete();
        return {
            success: true,
            message: "Message deleted successfully"
        };
    }
    throw new Error("Invalid channel type");
};
