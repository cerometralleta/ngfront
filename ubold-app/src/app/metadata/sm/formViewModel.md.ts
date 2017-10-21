/**
 * 表单数据
 */
import { Columns } from "../ngb/ngbGrid/columnOptions.md";

export class FormViewModel {
    constructor() {
        
    }
    id:string;
    // 表单编号
    code:string;
    sqlId:string;
    url:string;
    remark:string;

    // 表单字段
    columns:Array<Columns>;
}