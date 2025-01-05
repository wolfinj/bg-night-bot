import * as grpc from "@grpc/grpc-js";

import {cfg} from "../../../config/config";
import {AuthHandler} from "../types/authHandler";

export class ApiKeyAuth implements AuthHandler {
    async validateRequest(call: any): Promise<boolean> {
        const metadata = call.metadata.get("x-api-key");
        return metadata && metadata[0] === cfg.API_KEY;
    }

    handleError(callback: any): void {
        callback({
            code: grpc.status.UNAUTHENTICATED,
            message: "Invalid API key"
        });
    }
}
