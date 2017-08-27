/**
 * mock
 */
import { ColumOptions } from "../ngb/ngbGrid/columnOptions.md";
import { DataFilter, TreeOptions, Button, DataViewModule } from "../sm/dataViewModule.md";
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
        formData.treeOptions.show = false;
        formData.treeOptions.scope = 'SELF';
        formData.treeOptions.width = 2;
        formData.buttons = Array<Button>();
        formData.dataFilters = Array<DataFilter>();
    }

    static createDataViewList(dataViewModule){
         dataViewModule = new DataViewModule();
        dataViewModule.treeOptions = new TreeOptions();
        dataViewModule.treeOptions.show = true;
        dataViewModule.treeOptions.width = 2;
        dataViewModule.treeOptions.idKey="id";
        dataViewModule.treeOptions.name="name";
        dataViewModule.treeOptions.pIdKey="pId";
        dataViewModule.buttons = new Array<Button>();
        let button = new Button();
        button.location = 'row';
        button.title = '增加';
        let button1 = new Button();
        button1.location = 'nav';
        button1.title = '增加';
        dataViewModule.buttons.push(button);
        dataViewModule.buttons.push(button1);

        dataViewModule.dataFilters = new Array<DataFilter>();
        let dataFilter = new DataFilter();
        dataFilter.title = "11111"
        dataViewModule.dataFilters.push(dataFilter);

        let dataFilter1 = new DataFilter();
        dataViewModule.dataFilter1.title = "2222"
        dataViewModule.dataFilters.push(dataFilter1);

        let dataFilter2 = new DataFilter();
        dataFilter2.title = "33333"
        dataViewModule.dataFilters.push(dataFilter2);

        let dataFilter3 = new DataFilter();
        dataFilter3.title = "fafda33"
        dataViewModule.dataFilters.push(dataFilter3);

        let dataFilter4 = new DataFilter();
        dataFilter4.title = "33333"
        dataViewModule.dataFilters.push(dataFilter4);
        
        let dataFilter5 = new DataFilter();
        dataFilter5.title = "33333"
        dataViewModule.dataFilters.push(dataFilter5);
    }
}