/**
 * Columns @zkning
 */
export class Columns {
    constructor() {
    }

    id:string;
    viewId:string;
    title:string;
    field:string;
    updateType:number;
    isView:boolean;
    isInsert:boolean;
    dataType:string;
    componentType:string;
    idx:string;
    rule:Array<string>;
    length:number;
    formatter:string;
    sortName:string;
    order:string;
    sortTable:boolean;
    visible:boolean;
    lastUpdateTime:string;
    lastUpdateUser:string;
    version:number;
    createUser:string;
    createTime:string;
    options:Options;
}

export class Options {
    constructor() {
    }

    align:string;
    width:number;
    radio:boolean;
    checkbox:boolean;
}