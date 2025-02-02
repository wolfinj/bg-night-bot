import { GuildScheduledEvent } from "discord.js";

import { client } from "../discord";

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
