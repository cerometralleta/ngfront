/**
 * Column base @zkning
 */
export class Columns {
    field: string;
    title: string;
    updateType: string;
    view: boolean;
    insert: boolean;
    visible: boolean;
    dataType: string;
    fieldType: string;
    pattern: string; // 验证规则
    dataFormat: string; // 数据格式化
    maxlength: number;
    idx: number;
}

/**
 * bootstrap table ftr
 */
export class ColumOptions extends Columns{
    radio: boolean;
    checkbox: boolean;
    titleTooltip: string;
    class: string;
    rowspan: number;
    colspan: number;
    align: string;
    halign: string;
    falign: string;
    valign: string;
    width: string;
    sortable: boolean;
    order: string;
    cardVisible: boolean;
    switchable: boolean;
    uniqueCheck: boolean;
    clickToSelect: boolean;
    formatter: any;
    footerFormatter: any;
    // events:any;
    // sorter:any;
    sortName: string;
    // cellStyle:any;
    searchable: boolean;
    searchFormatter: boolean;
    escape: boolean;
    events: any;
   
}