import { ColumOptions } from '../../ngb/metadata/ngbGrid/columnOptions.md';
import { Options } from '../../ngb/metadata/ngbGrid/options.md';
import { TreeOptions, Button, DataFilter, DataViewModule } from '../metadata/dataViewModule.md';

/**
 * mock
 */

export class Mock {

    static createColumn() {
        const columns = new Array<ColumOptions>();
        const co = new ColumOptions();
        co.title = '名称';
        co.field = 'name';
        co.updateType = 'enable';
        co.fieldType = 'text';
        columns.push(co);

        let co1 = new ColumOptions();
        co1.title = '性别';
        co1.field = 'sex';
        co1.updateType = 'enable';
        co1.fieldType='radio';
        columns.push(co1);

        const co2 = new ColumOptions();
        co2.title = '说明';
        co2.field = 'remark';
        co2.updateType = 'hide';
        co2.fieldType = 'textarea';
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
        formData.dataViewCode = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        formData.dataViewName = 'dddddddddddddddddddd';
        formData.sqlId = 'FFFFFFFFFFFFFFFFFFFFF';

        const co = new ColumOptions();
        co.title = 'e3';
        co.field = 'ddd';
        formData.columns = new Array<any>();
        formData.columns.push(co);

        formData.treeOptions = new TreeOptions();
        formData.treeOptions.enabled = false;
        formData.treeOptions.scope = 'SELF';
        formData.treeOptions.width = 2;
        formData.buttons = Array<Button>();
        formData.dataFilters = Array<DataFilter>();
    }

    static createDataViewList(dataViewModule){
         dataViewModule = new DataViewModule();
        dataViewModule.treeOptions = new TreeOptions();
        dataViewModule.treeOptions.enabled = true;
        dataViewModule.treeOptions.width = 2;
        dataViewModule.treeOptions.idKey = 'id';
        dataViewModule.treeOptions.name = 'name';
        dataViewModule.treeOptions.pIdKey = 'pId';
        dataViewModule.buttons = new Array<Button>();
        const button = new Button();
        button.position = 'row';
        button.title = '增加';
        const button1 = new Button();
        button1.position = 'nav';
        button1.title = '增加';
        dataViewModule.buttons.push(button);
        dataViewModule.buttons.push(button1);

        dataViewModule.dataFilters = new Array<DataFilter>();
        const dataFilter = new DataFilter();
        dataFilter.title = '11111';
        dataViewModule.dataFilters.push(dataFilter);

        const dataFilter1 = new DataFilter();
        dataViewModule.dataFilter1.title = '2222'
        dataViewModule.dataFilters.push(dataFilter1);

        const dataFilter2 = new DataFilter();
        dataFilter2.title = '33333'
        dataViewModule.dataFilters.push(dataFilter2);

        const dataFilter3 = new DataFilter();
        dataFilter3.title = 'fafda33'
        dataViewModule.dataFilters.push(dataFilter3);

        const dataFilter4 = new DataFilter();
        dataFilter4.title = '33333';
        dataViewModule.dataFilters.push(dataFilter4);

        const dataFilter5 = new DataFilter();
        dataFilter5.title = '33333';
        dataViewModule.dataFilters.push(dataFilter5);
    }
}
