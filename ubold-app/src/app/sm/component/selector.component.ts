import { Component, OnInit, Inject, Input, ViewChild, ChangeDetectorRef, enableProdMode, AfterViewInit } from '@angular/core';
import { URLSearchParams, Http, Jsonp } from '@angular/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataViewCreateComponent } from './dataViewCreate.component';
import 'rxjs/add/operator/switchMap';
import { BaseComponent } from '../../frame/component/base.component';
import { DataViewModule, TreeOptions, DataFilter, Button } from '../metadata/dataViewModule.md';
import { DataModule, Setting } from '../../ngb/metadata/ngbTree/dataModule.md';
import { BootstrapTableDefaults } from '../../ngb/metadata/ngbGrid/options.md';
import { NgbGridComponent } from '../../ngb/component/ngbGrid.component';
import { NgbTreeComponent } from '../../ngb/component/ngbTree.component';
import { LoggerService } from '../../frame/service/logger.service';
import { HttpService } from '../../frame/service/http.service';
import { ToastrService } from '../../frame/service/toastr.service';
import { FormVerifiyService } from '../../frame/service/formVerifiy.service';
import { Key, SimpleData, Data, Keep } from '../../ngb/metadata/ngbTree/data.md';
import { Async } from '../../ngb/metadata/ngbTree/async.md';
import { Application } from '../constant/application.constant';
declare var $: any;
// Error: ExpressionChangedAfterItHasBeenCheckedError: 
// Expression has changed after it was checked. Previous value: 'true'. Current value: 'false'
enableProdMode();
/**
 * dataView选择器
 */
@Component({
    selector: 'sm-selector',
    templateUrl: './selector.component.html'
})
export class SelectorComponent extends BaseComponent implements OnInit{

    //页面数据
    @Input() dataViewModule: DataViewModule;

    // 树操作
    treeOptions: TreeOptions;

    // 查询条件
    dataFilters: Array<DataFilter>;

    // 内容区域宽度
    colContentWidth: number;

    // treeModule
    treeModule: DataModule;

    // bootstrap table数据
    options: BootstrapTableDefaults;

    // form group
    searchForm: FormGroup;
    buttons: Array<Button>;
    treeNode: any;
    @ViewChild(NgbTreeComponent) ngbTreeComponent: NgbTreeComponent; // 树组件
    @ViewChild(NgbGridComponent) ngbGridComponent: NgbGridComponent; // bootstrapTable
    constructor(
        public logger: LoggerService
        , public httpService: HttpService
        , public modalService: NgbModal
        , public fb: FormBuilder
        , public toastr: ToastrService
        , public activeModal: NgbActiveModal
        , formVerifiyService: FormVerifiyService
    ) { 
        super(formVerifiyService);
    }
    ngOnInit() {
        this.buttons = new Array<Button>();
        this.dataFilters = this.dataViewModule.dataFilters;
        this.treeOptions = this.dataViewModule.treeOptions;
        this.options = <BootstrapTableDefaults>this.dataViewModule.options;
        this.options.columns = this.dataViewModule.columns;
        const self = this;
        this.createQueryParams(self);
        this.createTreeModule();
        this.createDatafilter();
    }
    createQueryParams(self){
         this.options.queryParams = function (params) {
            params.treeOptions = self.treeOptions;
            params.searchArray = self.searchForm.value.searchArray;
            return params;
        }
    }
    // 获取选中行
    getSelectionsAndClose() {
        const selections = this.getSelections();
        if (!selections){
            return;
        }
        this.activeModal.close(selections);
    }

    getSelections() {
        const selected = this.ngbGridComponent.getSelections();
        if (selected.length < 1) {
            this.toastr.warning('请选择要处理的记录!');
            return;
        }
        return selected;
    }

    // 返回当前DataViewModel
    getDataViewModule() : DataViewModule {
        return this.dataViewModule;
    }

    // 查询对象
    createDatafilter() {
        const formArray = new Array<any>();
        this.dataFilters.forEach(datafilter => {
            formArray.push(this.fb.group({
                value: [datafilter.value],
                field: [datafilter.field],
                expression: [datafilter.expression],
                title: [datafilter.title]
            }))
        });
        this.searchForm = this.fb.group({ searchArray: this.fb.array(formArray) });
    }

    // 计算内容宽度
    zTreeRange() {
        const maxWidth = 12;
        if (this.treeOptions.show) {
            this.colContentWidth = maxWidth - this.treeOptions.width;
            return;
        }
        this.colContentWidth = maxWidth;
    }

    //查询列表
    search(nodeId?) {
        const datafilter = this.searchForm.value;
        datafilter.treeOptions = this.treeOptions;
        if (nodeId) {
            this.treeOptions.nodeValue = nodeId;
        }
        this.ngbGridComponent.refresh();
    }

    createTreeModule() {
        this.zTreeRange();
        // ztree data
        const treeModule = new DataModule();
        treeModule.setting = new Setting();

        const data = new Data();
        data.simpleData = new SimpleData();
        data.simpleData.idKey = this.treeOptions.idKey;
        data.simpleData.pIdKey = this.treeOptions.pIdKey;
        data.simpleData.enable = true;

        // ztree key
        data.key = new Key();
        data.key.name = this.treeOptions.name;
        data.key.title = data.key.name;

        // keep
        data.keep = new Keep();
        data.keep.leaf = false;
        data.keep.parent = true;
        treeModule.setting.data = data;

        // asyc
        const async = new Async();
        async.autoParam = [this.treeOptions.idKey + '=id']; // 服务端默认取id
        async.dataType = 'json';
        async.type = 'POST';
        async.url = Application.ubold_sm_sql_bootstrap_ztree;
        async.enable = this.treeOptions.enable;
        async.otherParam = ['sqlId', this.treeOptions.sqlId,
            'idKey', this.treeOptions.idKey,
            'pIdKey', this.treeOptions.pIdKey,
            'name', this.treeOptions.name,
            'scope', this.treeOptions.scope,
            'enable', this.treeOptions.enable + ''];
        treeModule.setting.async = async;

        const self = this;
        treeModule.setting.callback = {
            onClick: function (event, treeId, treeNode) {
                self.treeNode = treeNode;
                self.search(treeNode[data.simpleData.idKey]);
            },
            onAsyncSuccess: function (event, treeId, treeNode, msg) {

                // 默认展开第一个结点
                if (!treeNode) {
                    const treeObj = $.fn.zTree.getZTreeObj(treeId);
                    treeObj.expandNode(treeObj.getNodes()[0], true);
                }
            }
        }
        this.treeModule = treeModule;
    }
    refreshNode(){
        if (this.treeNode && null != this.treeNode){
            this.ngbTreeComponent.reAsyncChildNodes(this.treeNode);
        }
    }
}