import {TextChannel} from "discord.js";

import {client} from "../discord";

/**
 * Sends a message to a specified text channel in a Discord guild.
 *
 * This function fetches the channel using the provided channelId. If the channel
 * is a valid TextChannel, it sends the provided content as a message, logs the resulting
 * message data for verification, and returns an object that includes a success flag,
 * a status message, and the sent message's ID.
 *
 * @param guildId - The Discord Snowflake ID of the guild.
 * @param channelId - The Discord Snowflake ID of the channel.
 * @param content - The text message to send.
 * @returns A Promise that resolves with an object containing:
 *   - success: Indicates if the message was sent successfully.
 *   - message: A descriptive status message.
 *   - messageId: The identifier of the sent message.
 * @throws Error if the channel fetched is not a valid TextChannel.
 */
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
