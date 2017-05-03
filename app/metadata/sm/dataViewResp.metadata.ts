/**
 * sqlDefineView 公用查询对象
 */
import { DataView } from "./dataView.metadata";

export class DataViewResp {
    constructor() {
    }
    pageSize:number;
    pageNo:number;
    totalElements:number;
    content:Array<DataView>; 
}

