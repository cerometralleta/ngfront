/**
 * Content
 */

import { DataModule } from "../ngb/ngbTree/dataModule.md";
import { Options } from "../ngb/ngbGrid/options.md";

export class DataViewModule {
    constructor() {
        
    }
    id:string;
    version:number;
    createUser:string;
    createTime:string;
    lastUpdateUser:string;
    lastUpdateTime:string;
    code:string;
    name:string;
    remark:string;
    options:Options;
    treeModule:DataModule;
    conditions:Array<Condition>;
    buttons:Array<Button>;
}

/**
 * 查询条件
 */
export class Condition {
    constructor() {
        
    }
    isSort :number;
    componentType:string;
    field:string;
    dataType:string;
    expr:string;
    title:string;
    expand:string;
}

/**
 * Button
 */
export class Button {
    constructor() {
        
    }
    showDialog:number;//0:接口,1:弹窗,2:新窗口
    icon:string;
    dialogSize:string;
    title:string;
    url:string;
}