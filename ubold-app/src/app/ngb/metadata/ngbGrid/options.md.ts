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
    undefinedText: string;
    // 条纹
    striped = true;
    // sortName:string;
    sortOrder: string;
    sortStable: boolean;
    iconsPrefix: string;
    iconSize: string;
    buttonsClass: string;
    // icons:any;
    data: Array<any>;
    dataField: string;
    totalField: string;
    ajax: any;
    method: string;
    url: string;
    cache: boolean;
    contentType: string;
    dataType: string;
    ajaxOptions: any;
    queryParams: any;
    queryParamsType: string;
    // responseHandler:any;
    pagination: boolean;
    paginationLoop: boolean;
    onlyInfoPagination: boolean;
    sidePagination: string;
    pageNumber: number;
    pageSize: number;
    // pageList:Array<number>;
    selectItemName: string;
    smartDisplay: boolean;
    escape: boolean;
    search: boolean;
    searchOnEnterKey: boolean;
    strictSearch: boolean;
    searchText: string;
    searchTimeOut = 3;
    trimOnSearch: number;
    showHeader: boolean;
    showFooter: boolean;
    showColumns: boolean;
    showRefresh: boolean;
    showToggle: boolean;
    showPaginationSwitch: boolean;
    minimumCountColumns: number;
    idField: string;
    version: string;
    editView: boolean;
    uniqueId: string;
    cardView: boolean;
    detailView: boolean;
    // detailFormatter:any;
    searchAlign: string;
    buttonsAlign: string;
    toolbarAlign: string;
    paginationVAlign: string;
    paginationHAlign: string;
    paginationDetailHAlign: string;
    paginationPreText: string;
    paginationNextText: string;
    clickToSelect: boolean;
    singleSelect: boolean;
    toolbar: string;
    checkboxHeader: boolean;
    maintainSelected: boolean;
    sortable: boolean;
    silentSort: boolean;
    // rowStyle:any;
    // rowAttributes:any;
    // customSearch:any;
    // customSort:any;
    locale: string;
    // footerStyle:any;
    showExport: boolean;
    exportDataType: string; // export data type, support: 'basic', 'all', 'selected'.

    // funcButtons:Array<FuncButton>;
}

// http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/
// 表格的参数定义在 jQuery.fn.bootstrapTable.defaults。
export class BootstrapTableDefaults extends Options{
  columns: Array<ColumOptions>;
  onRefresh: any;
}