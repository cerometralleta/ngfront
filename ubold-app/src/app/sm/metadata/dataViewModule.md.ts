import { Options } from '../../ngb/metadata/ngbGrid/options.md';
import { ColumOptions } from '../../ngb/metadata/ngbGrid/columnOptions.md';

/**
 * Content
 */



export class DataViewModule {
    constructor() {}
    id: string;
    version: number;
    createUser: string;
    createTime: string;
    lastUpdateUser: string;
    lastUpdateTime: string;
    dataViewCode: string;
    dataViewName: string;
    sqlId: string;
    remark: string;
    options: Options;
    columns: Array<ColumOptions>;
    treeOptions: TreeOptions;
    dataFilters: Array<DataFilter>;
    buttons: Array<Button>;
}


export class TreeOptions{
    constructor() {}
    show: boolean;
    sqlId: string;
    idKey: string;
    name: string;
    pIdKey: string;
    scope: string;
    width: number;
    foreignKey: string;
    enable: boolean; // 是否异步
    nodeValue: string;
}

/**
 * 查询条件
 */
export class DataFilter {
    constructor() {}
    title: string;
    field: string;
    fieldType: string;
    dataType: string;
    expression: string;
    extensions: string;
    value: string;
}

/**
 * Button
 */
export class Button {
    constructor() {}
    id: string;
    option: string; // 0:接口,1:弹窗,2:新窗口
    modal: String;
    size?: 'sm' | 'lg'; // 窗口大小
    icon: string;
    title: string;
    url: string;
    position: string; // 导航按钮 nav:导航按钮,row:行内按钮
    sort: number;
    btnsize: string;
    color: string;
}

