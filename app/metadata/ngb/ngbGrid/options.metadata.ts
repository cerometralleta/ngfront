/**
 * Options
 * ningzk
 */
import { Columns } from "./columns.metadata";

export class Options {
    constructor() {
    }

    undefinedText:string;
    striped:boolean;
    icons:string;
    columns:Columns;
    data:Array<string>;
    url:string;
    ajaxOptions:any;
    pageNumber:number;
    pageSize:number;
    pageList:any;
    selectItemName:string;
    singleSelect:boolean;
    sortable:boolean;
    pagination:boolean;
    showExport:boolean;
}