import * as grpc from "@grpc/grpc-js";
import {
    ResponderBuilder,
    ServerInterceptingCall,
    ServerInterceptingCallInterface,
    ServerListenerBuilder
} from "@grpc/grpc-js";
import {ServerMethodDefinition} from "@grpc/grpc-js/build/src/make-client";

import {cfg} from "../../config/config";
import {logger} from "../../utils/logger";

export const apiKeyAuthInterceptor: grpc.ServerInterceptor = (
    methodDescriptor: ServerMethodDefinition<unknown, unknown>,
    call: ServerInterceptingCallInterface) => {

    logger.info(`Auth interceptor triggered for method: ${methodDescriptor.path}`);

    const authListener = (new ServerListenerBuilder())
        .withOnReceiveMetadata((metadata, next) => {
            const apiKey = metadata.get("x-api-key");
            if (apiKey && apiKey[0] === cfg.API_KEY) {
                next(metadata);
            } else {
                call.sendStatus({
                    code: grpc.status.UNAUTHENTICATED,
                    details: "Invalid API key"
                });
            }
        })
        .build();

    const responder = (new ResponderBuilder())
        .withStart(next => next(authListener))
        .build();
    return new ServerInterceptingCall(call, responder);
};

