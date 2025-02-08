import {startServer} from "./api/server";
import {startBot} from "./bot/discord";
import {logger} from "./utils/logger";

async function main() {
    logger.info("Starting bot service...");
    await startBot();
    logger.info("Starting gRpc service...");
    startServer();
}

main().catch(err => logger.error(err));
