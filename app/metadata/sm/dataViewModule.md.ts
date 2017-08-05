/**
 * Content
 */

import { DataModule } from "../ngb/ngbTree/dataModule.md";
import { Options } from "../ngb/ngbGrid/options.md";
import { ColumOptions } from "../ngb/ngbGrid/columnOptions.md";

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
    sqlId:string;
    remark:string;
    options:Options;
    columns:Array<ColumOptions>;
    treeOptions:TreeOptions;
    dataFilters:Array<DataFilter>;
    buttons:Array<Button>;
}


export class TreeOptions{
    constructor() {}
    isShow:boolean;
    sqlId:string;
    idKey:string;
    name:string;
    pIdKey:string;
    scope:string;
    width:number;
    relationField:string;
}

/**
 * 查询条件
 */
export class DataFilter {
    constructor() {
        
    }
    title:string;
    field:string;
    fieldType:string;
    dataType:string;
    expression:string;
    extensions:string;
}

/**
 * Button
 */
export class Button {
    constructor() {
        
    }
    id:string;
    func:number;//0:接口,1:弹窗,2:新窗口
    icon:string;
    dialogSize:string;
    title:string;
    url:string;
    type:number;//导航按钮 1:导航按钮,0:行内按钮
    sort:number;
}