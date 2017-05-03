/**
 * ztree配置,详情见http://www.treejs.cn/v3/api.php
 */
import { GUID } from "../../utils/guid.util";
import { Async } from "./async.metadata";
import { Data } from "./data.metadata";

export class Setting {
    constructor() {
        this.treeId = GUID.createGUIDString();
    }
    treeId:string;
    treeObj:any;
    async:Async;
    data:Data;
    znodes:any;//树数据
}