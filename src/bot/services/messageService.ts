import {TextChannel} from "discord.js";

import {client} from "../discord";

export const sendChannelMessage = async (channelId: string, content: string) => {
    const channel = await client.channels.fetch(channelId);
    if (channel instanceof TextChannel) {
        const sentMessage = await channel.send(content);
        // Let's add a console.log here to verify the data
        console.log("Sent message data:", {
            success: true,
            message: "Message sent successfully",
            message_id: sentMessage.id // This matches our proto definition message_id
        });
        return {
            success: true,
            message: "Message sent successfully",
            message_id: sentMessage.id // Changed to match proto definition
        };
    }
    throw new Error("Invalid channel type");
};

export const getAvailableChannels = () => {
    return client.channels.cache
        .filter((channel): channel is TextChannel => channel.type === 0)
        .map(channel => ({
            id: channel.id,
            name: channel.name,
            type: channel.type
        }));
};

export const deleteChannelMessage = async (channelId: string, messageId: string) => {
    const channel = await client.channels.fetch(channelId);
    if (channel instanceof TextChannel) {
        const message = await channel.messages.fetch(messageId);
        await message.delete();
        return {
            success: true,
            message: 'Message deleted successfully'
        };
    }
    throw new Error('Invalid channel type');
};

