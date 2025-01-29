import {ServerUnaryCall, sendUnaryData} from "@grpc/grpc-js";

import {ApiKeyAuth} from "./auth/apiKeyAuth";
import {AuthHandler} from "./types/authHandler";

export const createAuthMiddleware = <RequestType, ResponseType>(
    handler: AuthHandler<RequestType, ResponseType>
) => {
    return async (
        call: ServerUnaryCall<RequestType, ResponseType>,
        callback: sendUnaryData<ResponseType>
    ) => {
        const isValid = await handler.validateRequest(call);
        if (!isValid) {
            handler.handleError(callback);
            return false;
        }
        return true;
    };
};

export const auth = <RequestType, ResponseType>(
    call: ServerUnaryCall<RequestType, ResponseType>,
    callback: sendUnaryData<ResponseType>
) => {
    return createAuthMiddleware<RequestType, ResponseType>(new ApiKeyAuth())(call, callback);
};
