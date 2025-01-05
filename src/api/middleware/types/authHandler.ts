export interface AuthHandler {
    validateRequest(call: any): Promise<boolean>;

    handleError(callback: any): void;
}
