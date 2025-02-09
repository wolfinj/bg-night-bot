import {Client, Events, GatewayIntentBits} from "discord.js";

import {cfg} from "../config/config";
import {logger} from "../utils/logger";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents
    ]
});

// Get all event names as valid ClientEvents keys
const discordEvents: string[] = Object.values(Events);

discordEvents.forEach((eventName: string) => {
    client.on(eventName.toString(), (...args: unknown[]) => {
        if (eventName === Events.ClientReady) {
            const readyClient = args[0] as Client<true>;
            logger.info(`[Discord Ready] Logged in as ${readyClient.user.tag}`);
        } else if (eventName === Events.Debug) {
            logger.debug(`[Discord Debug]`, {
                data: args[0]
            });
        } else if (eventName === Events.Error) {
            logger.debug(`[Discord Error]`, {
                data: args[0]
            });
        } else if (eventName === Events.Warn) {
            logger.debug(`[Discord Warn]`, {
                data: args[0]
            });
        } else if (eventName === Events.Raw) {
            logger.silly(`[Discord Raw] `, {
                data: args
            });
        } else {
            logger.debug(`[Discord '${eventName}' Event] `, {
                data: args[0]
            });
        }
    });
});

export const startBot = async () => {
    await client.login(cfg.DISCORD_TOKEN);
};
