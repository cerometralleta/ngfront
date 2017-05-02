/**
 * Column
 */
export class Column {
    constructor() {
        
    }
    id:string;
    viewId:string;
    title:string;
    field:string;
    options:string;
    isDisplay:number;
    sort:string;
    modiftyType:number;
    isView:number;
    isInsert:number;
    dataType:string;
    componentType:string;
    idx:number;
    length:number;
    rule:Array<string>;
    version:number;
    createUser:string;
    createTime:string;
    lastUpdateUser:string;
    lastUpdateTime:string;
}