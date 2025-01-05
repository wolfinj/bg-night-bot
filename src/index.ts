import {startServer} from "./api/server";
import { startBot } from './bot/discord';

async function main() {
    await startBot();
    startServer();
}

main().catch(console.error);
