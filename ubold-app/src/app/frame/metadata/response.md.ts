 /**
 * name
 */
export class Response<T> {
    constructor() {
    }
    code: number;
    message: string;
    result: T;
}