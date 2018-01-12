/**
 * grid Options
 * ningzk
 */

/**
 * bootstrap-table
 * table options
 */
import { Columns, ColumOptions } from './columnOptions.md';

export class Options {
    classes: string;
    sortClass: string;
    height: number;
    undefinedText = '-';
    striped = false; // 设置为 true 会有隔行变色效果
    // sortName:string; // 定义排序列,通过url方式获取数据填写字段名，否则填写下标
    sortOrder: string;
    sortStable = false;
    iconsPrefix: string;
    iconSize: string;
    buttonsClass: string;
    // icons:any;
    data = [];
    dataField: string;
    totalField: string;
    ajax: any;
    method = 'get';
    url: string;
    cache = true;
    contentType = 'application/json';
    dataType = 'json';
    ajaxOptions: any;
    queryParams: any;
    queryParamsType = 'undefined';
    // responseHandler:any;
    pagination = false; // 设置为 true 会在表格底部显示分页条
    paginationLoop = true; // 设置为 true 启用分页条无限循环的功能。
    onlyInfoPagination = false; // 设置为 true 只显示总数据数，而不显示分页按钮。需要 pagination='True'
    sidePagination = 'server'; // 设置在哪里进行分页，可选值为 'client' 或者 'server'。设置 'server'时，必须设置 服务器数据地址（url）或者重写ajax方法
    pageNumber = 1;
    pageSize = 10;
    // pageList:Array<number>;
    selectItemName: string;
    smartDisplay = true;
    escape = false;
    search = false;
    searchOnEnterKey = false; // 设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
    strictSearch = false; // 设置为 true启用 全匹配搜索，否则为模糊搜索
    searchText: string;
    searchTimeOut = 500;
    trimOnSearch = true; // 	设置为 true 将允许空字符搜索
    showHeader = true; // 是否显示列头
    showFooter = false;
    showColumns = false; // 是否显示 内容列下拉框
    showRefresh = false;
    showToggle = false; // 是否显示 切换试图（table/card）按钮
    showPaginationSwitch = false;
    minimumCountColumns = 1; // 当列数小于此值时，将隐藏内容列下拉框。
    idField: string;
    version: string;
  //  editView: boolean;
    uniqueId: string;
    cardView = false; // 设置为 true将显示card视图，适用于移动设备。否则为table试图，适用于pc
    detailView = false; // 设置为 true 可以显示详细页面模式。
    // detailFormatter:any;
    searchAlign = 'right';
    buttonsAlign = 'right';
    toolbarAlign = 'left';
    paginationVAlign = 'bottom';
    paginationHAlign = 'right';
    paginationDetailHAlign = 'left';
    paginationPreText = '<';
    paginationNextText = 	'>';
    clickToSelect = false;
    singleSelect = false; // 设置True 将禁止多选
    toolbar: string;
    checkboxHeader = true;
    maintainSelected = true; // 设置为 true 在点击分页按钮或搜索按钮时，将记住checkbox的选择项
    sortable = true; // 设置为false 将禁止所有列的排序
    silentSort = true; // 设置为 false 将在点击分页按钮时，自动记住排序项。仅在 sidePagination设置为 server时生效.
    // rowStyle:any;
    // rowAttributes:any;
    // customSearch:any;
    // customSort:any;
    locale: string;
    // footerStyle:any;
    showExport = false;
    exportDataType: string; // export data type, support: 'basic', 'all', 'selected'.

    // funcButtons:Array<FuncButton>;
}

// http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/
// 表格的参数定义在 jQuery.fn.bootstrapTable.defaults。
export class BootstrapTableDefaults extends Options{
  columns: Array<ColumOptions>;
  onRefresh: any;
}