/**
 * grid Options
 * ningzk
 */
import { Columns } from "./columns.md";

export class Options {
    constructor() {
    }
    classes:string;
    sortClass:string;
    height:number;
    undefinedText:string;
    striped:boolean;
    sortName:string;
    sortOrder:string;
    sortStable:boolean;
    iconsPrefix:string;
    iconSize:string;
    buttonsClass:string;
    icons:any;
    data:Array<any>;
    dataField:string;
    totalField:string;
    ajax:any;
    method:string;
    url:string;
    cache:boolean;
    contentType:string;
    dataType:string;
    ajaxOptions:any;
    queryParams:any;
    queryParamsType:string;
    responseHandler:any;
    pagination:boolean;
    paginationLoop:boolean;
    onlyInfoPagination:boolean;
    sidePagination:string;
    pageNumber:string;
    pageSize:string;
    pageList:Array<number>;
    selectItemName:string;
    smartDisplay:boolean;
    escape:boolean;
    search:boolean;
    searchOnEnterKey:boolean;
    strictSearch:boolean;
    searchText:string;
    searchTimeOut:number;
    trimOnSearch:number;
    showHeader:boolean;
    showFooter:boolean;
    showColumns:boolean;
    showRefresh:boolean;
    showToggle:boolean;
    showPaginationSwitch:boolean;
    minimumCountColumns:number;
    idField:string;
    uniqueId:string;
    cardView:boolean;
    detailView:boolean;
    detailFormatter:any;
    searchAlign:string;
    buttonsAlign:string;
    toolbarAlign:string;
    paginationVAlign:string;
    paginationHAlign:string;
    paginationDetailHAlign:string;
    paginationPreText:string;
    paginationNextText:string;
    clickToSelect:boolean;
    singleSelect:boolean;
    toolbar:string;
    checkboxHeader:boolean;
    maintainSelected:boolean;
    sortable:boolean;
    silentSort:boolean;
    rowStyle:any;
    rowAttributes:any;
    customSearch:any;
    customSort:any;
    locale:string;
    footerStyle:any;
    columns:Columns;
    showExport:boolean;
}