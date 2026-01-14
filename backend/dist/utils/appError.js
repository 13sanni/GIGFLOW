export class AppError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
//# sourceMappingURL=appError.js.map