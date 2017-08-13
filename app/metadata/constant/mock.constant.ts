/**
 * mock
 */
import { ColumOptions } from "../ngb/ngbGrid/columnOptions.md";

export class Mock {

    static createColumn() {
        let columns = new Array<ColumOptions>();
        let co = new ColumOptions();
        co.title = '名称';
        co.field = 'name';
        co.updateType = "enable";
        co.fieldType="text";
        columns.push(co);

        let co1 = new ColumOptions();
        co1.title = '性别';
        co1.field = 'sex';
        co1.updateType = "enable";
        co1.fieldType="radio";
        columns.push(co1);

        let co2 = new ColumOptions();
        co2.title = '说明';
        co2.field = 'remark';
        co2.updateType = "hide";
        co2.fieldType="textarea";
        columns.push(co2);
        return columns;
    }


    static createDataView(){

    }
}