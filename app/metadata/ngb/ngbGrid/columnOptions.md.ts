/**
 * Column base @zkning
 */
export class Columns {
    constructor() {}
    field:string;
    title:string;
    updateType:string;
    view:boolean;
    insert:boolean;
    visible:boolean;
    dataType:string;
    fieldType:string;
    rule:Array<string>;
    maxlength:number;
    idx:number;
}

/**
 * bootstrap table ftr
 */
export class ColumOptions extends Columns{
    radio:boolean;
    checkbox:boolean;
    titleTooltip:string;
    class:string;
    rowspan:number;
    colspan:number;
    align:string;
    halign:string;
    falign:string;
    valign:string;
    width:string;
    sortable:boolean;
    order:string;
    cardVisible:boolean;
    switchable:boolean;
    clickToSelect:boolean;
    formatter:any;
    footerFormatter:any;
    // events:any;
    // sorter:any;
    sortName:string;
    // cellStyle:any;
    searchable:boolean;
    searchFormatter:boolean;
    escape:boolean;
    pattern:string;//验证规则
    events:any;
}