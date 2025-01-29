import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";

export interface AuthHandler<RequestType, ResponseType> {
    validateRequest(call: ServerUnaryCall<RequestType, ResponseType>): Promise<boolean>;
    handleError(callback: sendUnaryData<ResponseType>): void;
}
