/**
 * Content
 */

export class SqlView {
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
    showRowNum:number;
    sqlId:string;
    remark:string;
    multiple:number;
    columnList:Array<Column>;
    treeData:TreeData;
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
 * 查询列
 */
export class Column {
    constructor() {
        
    }
    id:string;
    viewId:string;
    title:string;
    field:string;
    options:string;
    isDisplay:number;
    sort:string;
    modiftyType:number;
    isView:number;
    isInsert:number;
    dataType:string;
    componentType:string;
    idx:number;
    length:number;
    rule:Array<string>;
    version:number;
    createUser:string;
    createTime:string;
    lastUpdateUser:string;
    lastUpdateTime:string;
}

/**
 * Button
 */
export class Button {
    constructor() {
        
    }
    showWin:number;
    icon:string;
    winSize:string;
    id:string;
    title:string;
    type:number;
    url:string;
}

/**
 * TreeData
 */
export class TreeData {
    constructor() {
        
    }
    sqlId:string;
    idKey:string;
    pIdKey:string;
    name:string;
    width:string;
    rootPId:string;
    nodeOpts:string;
    relationField:string;
    url:string;
    isShow:number;
}