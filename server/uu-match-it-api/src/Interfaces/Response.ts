export class Response<T> {
    status: number;
    message: string;
    data: T;
    ok: boolean;

    constructor(status: number, message: string, data: T) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
