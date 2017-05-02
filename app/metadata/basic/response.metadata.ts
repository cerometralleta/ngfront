 /**
 * name
 */
export class BaseResponse<T> {
    constructor() {
        
    }
    code:number;
    message:string;
    result:T;
}