/**
 * @module gRpcServices
 * 
 * This module re-exports all gRPC service methods used for interacting with the Discord bot.
 * Services include deleteMessage, getGuilds, getChannels, and sendMessage.
 */

export { deleteMessage } from "./deleteMessage";
export { getGuilds } from "./getGuilds";
export { getChannels } from "./getChannels";
export { sendMessage } from "./sendMessage";
