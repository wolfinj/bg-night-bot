import * as grpc from "@grpc/grpc-js";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";

import { cfg } from "../../../config/config";
import { AuthHandler } from "../types/authHandler";

export class ApiKeyAuth<RequestType, ResponseType> implements AuthHandler<RequestType, ResponseType> {
    async validateRequest(call: ServerUnaryCall<RequestType, ResponseType>): Promise<boolean> {
        const metadata = call.metadata.get("x-api-key");
        return metadata && metadata[0] === cfg.API_KEY;
    }

    handleError(callback: sendUnaryData<ResponseType>): void {
        callback({
            code: grpc.status.UNAUTHENTICATED,
            message: "Invalid API key"
        });
    }
}
