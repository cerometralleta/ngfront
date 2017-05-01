/**
 * ztree配置,详情见http://www.treejs.cn/v3/api.php
 */
import { GUID } from "../../utils/guid.util";
import { Async } from "./async.metadata";

export class Setting {
    constructor() {
        this.treeId = GUID.createGUIDString();
    }
    treeId:string;
    treeObj:any;
    async:Async;
}