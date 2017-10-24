import { DataViewModule } from './dataViewModule.md';

/**
 * sqlDefineView 公用查询对象
 */


export class DataViewResp {
    constructor() {
    }
    pageSize: number;
    pageNo: number;
    totalElements: number;
    content: Array<DataViewModule>; 
}

