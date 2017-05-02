/**
 * Content
 */
import { Column } from "./column.metadata";
import { TreeData } from "./tree.metadata";
import { Condition } from "./condition.metadata";
import { Button } from "./button.metadata";

export class Content {
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