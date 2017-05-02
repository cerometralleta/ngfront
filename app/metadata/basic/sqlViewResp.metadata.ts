/**
 * sqlDefineView 公用查询对象
 */
export class SqlViewResp {
    constructor() {
    }
    pageSize:number;
    pageNo:number;
    totalElements:number;
    content:Array<SqlView>; 
}

