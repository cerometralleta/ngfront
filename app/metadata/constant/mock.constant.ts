/**
 * mock
 */
import { ColumOptions } from "../ngb/ngbGrid/columnOptions.md";
import { DataFilter, TreeOptions, Button } from "../sm/dataViewModule.md";
import { Options } from "../ngb/ngbGrid/options.md";

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


    static createDataView(formData){
        formData.options = new Options();
        formData.options.method = 'POST';
        formData.options.pagination = false;
        formData.options.showExport = false;
        formData.options.pageSize = 5000;
        formData.options.pageNumber = 1;
        formData.dataViewCode = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        formData.dataViewName = "dddddddddddddddddddd";
        formData.sqlId = "FFFFFFFFFFFFFFFFFFFFF";

        let co = new ColumOptions();
        co.title = "e3";
        co.field = "ddd";
        formData.columns = new Array<any>();
        formData.columns.push(co);

        formData.treeOptions = new TreeOptions();
        formData.treeOptions.isShow = false;
        formData.treeOptions.scope = 'SELF';
        formData.treeOptions.width = 2;
        formData.buttons = Array<Button>();
        formData.dataFilters = Array<DataFilter>();
    }
}