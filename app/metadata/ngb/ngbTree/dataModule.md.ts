/**
 * ztree配置,详情见http://www.treejs.cn/v3/api.php
 * ningzk
 */
import { Async } from "./async.md";
import { Data } from "./data.md";
import { GUID } from "../../../utils/guid.util";


/**
 * name
 */
export class DataModule {
    constructor() {
    }
    setting:Setting;
    znodes:any;//树数据
}

export class Setting {
    constructor() {
        this.treeId = GUID.createGUIDString();
    }
    treeId:string;
    treeObj:any;
    async:Async;
    data:Data;
}