import {TextChannel} from "discord.js";

import {client} from "../discord";

export const sendChannelMessage = async (guildId: string, channelId: string, content: string) => {
    const channel = await client.channels.fetch(channelId);
    if (channel instanceof TextChannel) {
        const sentMessage = await channel.send(content);
        // Let's add a console.log here to verify the data
        console.log("Sent message data:", {
            success: true,
            message: "Message sent successfully",
            messageId: sentMessage.id // This matches our proto definition message_id
        });
        return {
            success: true,
            message: "Message sent successfully",
            messageId: sentMessage.id // Changed to match proto definition
        };
    }
    throw new Error("Invalid channel type");
};
