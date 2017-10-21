/**
 * sqlDefineView 公用查询对象
 */

import { DataViewModule } from "./dataViewModule.md";

export class DataViewResp {
    constructor() {
    }
    pageSize:number;
    pageNo:number;
    totalElements:number;
    content:Array<DataViewModule>; 
}

