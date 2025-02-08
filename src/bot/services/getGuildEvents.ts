import {GuildScheduledEvent} from "discord.js";

import {client} from "../discord";

/**
 * Retrieves scheduled events for a specific guild.
 *
 * This function fetches the guild using the provided guild ID and then retrieves
 * all scheduled events. Each event is mapped to an object containing details
 * such as event id, name, description, type, status, associated channel ID,
 * start and end time (if available), creator ID, and event image.
 *
 * @param guildId - The Discord Snowflake ID of the guild.
 * @returns A Promise that resolves with an array of event objects, where each object includes:
 *   - id: Event identifier.
 *   - name: Event name.
 *   - description: Event description.
 *   - type: Event type identifier.
 *   - status: Current event status.
 *   - channelId: Associated channel snowflake (if applicable).
 *   - startTime: ISO string of event start time (if available).
 *   - endTime: ISO string of event end time (if available).
 *   - creatorId: Identifier of the user who created the event.
 *   - image: URL of the event image (if any).
 */
export const getGuildEvents = async (guildId: string) => {
    const guild = await client.guilds.fetch(guildId);
    const events = await guild.scheduledEvents.fetch();

    return events.map((event: GuildScheduledEvent) => ({
        id: event.id,
        name: event.name,
        description: event.description,
        type: event.entityType,
        status: event.status,
        channelId: event.channelId,
        startTime: event.scheduledStartAt?.toISOString(),
        endTime: event.scheduledEndAt?.toISOString(),
        creatorId: event.creatorId,
        image: event.image
    }));
};
