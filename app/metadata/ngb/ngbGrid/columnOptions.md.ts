/**
 * Column base @zkning
 */
export class Columns {
    constructor() {
    }
    field:string;
    title:string;
    updateType:string;
    isView:boolean;
    isInsert:boolean;
    visible:boolean;
    dataType:string;
    fieldType:string;
    rule:Array<string>;
    maxlength:number;
    idx:string;
}

/**
 * bootstrap table ftr
 */
export class ColumOptions extends Columns{
    radio:boolean;
    checkbox:boolean;
    // field:string;
    // title:string;
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