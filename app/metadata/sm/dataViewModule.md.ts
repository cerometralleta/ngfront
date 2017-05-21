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
    dataViewCode:string;
    dataViewName:string;
    sqlid:string;
    remark:string;
    options:Options;
    treeModule:TreeModule;
    conditions:Array<Condition>;
    buttons:Array<Button>;
}


export class TreeModule{
    constructor() {}
    isShow:boolean;
    url:string;
    idKey:string;
    name:string;
    pIdKey:string;
    nodeOpts:string;
    width:number;
    relationField:string;
}

/**
 * 查询条件
 */
export class Condition {
    constructor() {
        
    }
    isSort :boolean;
    fieldType:string;
    field:string;
    dataType:string;
    expr:string;
    title:string;
    extensions:string;
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