import {Client, Events, GatewayIntentBits} from "discord.js";

import {cfg} from "../config/config";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
    ]
});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

export const startBot = async () => {
    await client.login(cfg.DISCORD_TOKEN);
};
