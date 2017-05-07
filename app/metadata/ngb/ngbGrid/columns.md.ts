/**
 * Columns @zkning
 */
export class Columns {
    constructor() {
    }

    id:string;
    field:string;
    title:string;
    titleTooltip:string;
    viewId:string;
    updateType:number;
    isView:boolean;
    isInsert:boolean;
    dataType:string;
    componentType:string;
    idx:string;
    rule:Array<string>;
    length:number;
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
    radio:boolean;
    checkbox:boolean;
    field:string;
    title:string;
    titleTooltip:string;
    class:string;
    rowspan:number;
    colspan:number;
    align:string;
    halign:string;
    falign:string;
    valign:string;
    width:number;
    sortable:boolean;
    order:string;
    visible:boolean;
    cardVisible:boolean;
    switchable:boolean;
    clickToSelect:boolean;
    formatter:any;
    footerFormatter:any;
    events:any;
    sorter:any;
    sortName:string;
    cellStyle:any;
    searchable:boolean;
    searchFormatter:boolean;
    escape:boolean;
}