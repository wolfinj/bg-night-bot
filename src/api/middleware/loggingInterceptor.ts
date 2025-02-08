import * as grpc from "@grpc/grpc-js";
import {
    ResponderBuilder,
    ServerInterceptingCall,
    ServerInterceptingCallInterface,
    ServerListenerBuilder
} from "@grpc/grpc-js";
import {ServerMethodDefinition} from "@grpc/grpc-js/build/src/make-client";

import {logger} from "../../utils/logger";

export const loggingInterceptor: grpc.ServerInterceptor = (
    methodDescriptor: ServerMethodDefinition<unknown, unknown>,
    call: ServerInterceptingCallInterface
) => {
    const startTime = Date.now();

    // Create a listener that logs incoming metadata and messages.
    const listener = new ServerListenerBuilder()
        .withOnReceiveMetadata((metadata, next) => {
            // Mask the x-api-key metadata value before logging.
            const maskedMetadata = metadata.toJSON();
            if (maskedMetadata["x-api-key"]) {
                maskedMetadata["x-api-key"] = ["*****"];
            }

            logger.info(`[gRpc Received metadata] - Method: ${methodDescriptor.path}`, {data: maskedMetadata});
            next(metadata);
        })
        .withOnReceiveMessage((message, next) => {
            logger.info(`[gRpc Received message] - Method: ${methodDescriptor.path}`, {data: message});
            next(message);
        })
        .build();

    // Create a responder that logs the outgoing status.
    const responder = new ResponderBuilder()
        .withStart((next) => next(listener))
        .withSendMessage((message, next) => {
            logger.info(`[gRpc Sending message] - Method: ${methodDescriptor.path}`, {data: message});
            next(message);
        })
        .withSendStatus((status, next) => {
            const duration = Date.now() - startTime;
            if (status.code === grpc.status.UNAUTHENTICATED) {
                logger.warn(
                    `[gRpc Response status] - Method: ${methodDescriptor.path}, Code: ${status.code}, Details: ${status.details}, Caller: ${call.getPeer()}, Duration: ${duration}ms`
                );
            } else if (status.code !== grpc.status.OK) {
                logger.error(
                    `[gRpc Response status] - Method: ${methodDescriptor.path}, Code: ${status.code}, Details: ${status.details}, Duration: ${duration}ms`
                );
            } else {
                logger.info(
                    `[gRpc Response status] - Method: ${methodDescriptor.path}, Code: ${status.code}, Details: ${status.details}, Duration: ${duration}ms`
                );
            }
            next(status);
        })
        .build();

    // Return a new intercepting call with the responder.
    return new ServerInterceptingCall(call, responder);
};
