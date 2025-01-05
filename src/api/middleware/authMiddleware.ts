import {ApiKeyAuth} from "./auth/apiKeyAuth";
import {AuthHandler} from "./types/authHandler";

export const createAuthMiddleware = (handler: AuthHandler) => {
    return async (call: any, callback: Function) => {
        const isValid = await handler.validateRequest(call);
        if (!isValid) {
            handler.handleError(callback);
            return false;
        }
        return true;
    };
};

// Current implementation
export const auth = createAuthMiddleware(new ApiKeyAuth());
