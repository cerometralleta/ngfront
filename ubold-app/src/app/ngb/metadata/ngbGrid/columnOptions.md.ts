/**
 * Column base @zkning
 */
export class Columns {
    field: string;
    title: string;
    updateType: string;
    view = false;
    insert = false;
    visible = true;
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
    radio = false;
    checkbox = false;
    titleTooltip: string;
    class: string;
    rowspan: number;
    colspan: number;
    align: string;
    halign: string;
    falign: string;
    valign: string;
    width: string;
    sortable = false;
    order = 'asc';
    cardVisible = true;
    switchable = true;
    unduplicated = false;
    clickToSelect = true;
    formatter: any;
    footerFormatter: any;
    // events:any;
    // sorter:any;
    sortName: string;
    // cellStyle:any;
    searchable = true;
    searchFormatter = true;
    escape = false;
    events: any;
}