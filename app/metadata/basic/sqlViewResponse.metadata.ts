/**
 * sqlDefineView 公用查询对象
 */
import { Condition } from "./condition.metadata";
import { TreeData } from "./tree.metadata";
import { Button } from "./button.metadata";
import { Column } from "./column.metadata";
import { Content } from "./content.metadata";

export class SqlViewResult {
    constructor() {
    }
    pageSize:number;
    pageNo:number;
    totalElements:number;
    content:Array<Content>; 
}

