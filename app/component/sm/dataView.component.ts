import { Component, OnInit, Inject, Input, ViewChild, Type, ComponentFactoryResolver } from '@angular/core';
import { URLSearchParams, Http, Jsonp } from "@angular/http";
import { HttpService } from "../../service/basic/http.service";
import { Application } from "../../metadata/constant/application.constant";
import { LoggerService } from "../../service/basic/logger.service";
import { ButtonType } from "../../metadata/constant/buttonType.constant";
import { GUID } from "../../utils/guid.util";
import { Response } from "../../metadata/response.md";
import { Options, BootstrapTableDefaults } from "../../metadata/ngb/ngbGrid/options.md";
import { Setting, DataModule } from "../../metadata/ngb/ngbTree/dataModule.md";
import { DataViewModule, TreeOptions, Button, DataFilter } from "../../metadata/sm/dataViewModule.md";
import { ActivatedRoute, Params } from "../../../node_modules/._@angular_router@4.1.1@@angular/router";
import 'rxjs/add/operator/switchMap';
import { SimpleData, Key, Data, Keep } from "../../metadata/ngb/ngbTree/data.md";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataViewCreateComponent } from "./dataViewCreate.component";
import { Mock } from "../../metadata/constant/mock.constant";
import { NgbTreeComponent } from "../ngb/ngbTree.component";
import { NgbGridComponent } from "../ngb/ngbGrid.component";
import { GoldbalConstant } from "../../metadata/constant/global.constant";
import { ToastrService } from "../../service/basic/toastr.service";
import { Async } from "../../metadata/ngb/ngbTree/async.md";

/**
 * 统一dataView
 */
@Component({
    selector: 'sm-dataView',
    templateUrl: './app/component/sm/dataView.component.html'
})
export class DataViewComponent implements OnInit {

    //页面数据
    dataViewModule: DataViewModule;

    // 树操作
    treeOptions: TreeOptions;

    // 查询条件
    dataFilters: Array<DataFilter>;

    // 按钮
    buttons: Array<Button>;

    // 内容区域宽度
    colContentWidth: number;

    // treeModule
    ztree: DataModule;

    //bootstrap table数据
    options: BootstrapTableDefaults;

    //form group
    searchForm: FormGroup;

    @ViewChild(NgbTreeComponent) ngbTreeComponent: NgbTreeComponent;//树组件
    @ViewChild(NgbGridComponent) ngbGridComponent: NgbGridComponent;//bootstrapTable
    constructor(
        private logger: LoggerService
        , private httpService: HttpService
        , private route: ActivatedRoute
        , private modalService: NgbModal
        , private fb: FormBuilder
        , private toastr: ToastrService
        , private componentFactoryResolver : ComponentFactoryResolver
    ) { }
    ngOnInit() {

        // Mock.createDataViewList(this.dataViewModule);

        //监控路由守卫获取初始化数据
        this.route.data.subscribe(resp => {
            this.dataViewModule = resp.dataViewResolver.result;
            this.dataViewModule.columns = resp.dataViewResolver.result.columns;
            this.buttons = resp.dataViewResolver.result.buttons;
            this.dataFilters = resp.dataViewResolver.result.dataFilters;
            this.treeOptions = resp.dataViewResolver.result.treeOptions;
            this.options = resp.dataViewResolver.result.options;
            this.options.columns = resp.dataViewResolver.result.columns;
        });

        //计算右边宽度
        this.rightWidth();

        //构建树
        this.ztree = this.createTree();

        //构建查询过滤
        this.createSearch();
    }

    //获取已有的component
    createComponentInstance(componentName) {
        var factories = Array.from(this.componentFactoryResolver['_factories'].keys());
        var factoryClass = <Type<any>>factories.find((x: any) => x.name === componentName);
        return factoryClass;
    }

    //获取选中行
    getSelections() {
        return this.ngbGridComponent.getSelections();
    }

    //返回当前DataViewModel
    getDataViewModule() {
        return this.dataViewModule;
    }

    //查询对象
    createSearch() {
        let formArray = new Array<any>();
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

    //查询列表
    search() {
        let datafilter = this.searchForm.value;
        this.ngbGridComponent.refresh(datafilter);
    }

    //构建ztree
    createTree() {

        // ztree data
        let treeModule = new DataModule();
        treeModule.setting = new Setting();

        let data = new Data();
        let simpleData = new SimpleData();
        simpleData.idKey = this.treeOptions.idKey;
        simpleData.pIdKey = this.treeOptions.pIdKey;
        simpleData.enable = true;
        data.simpleData = simpleData;

        //ztree key
        let key = new Key();
        key.name = this.treeOptions.name;
        key.title = key.name;
        data.key = key;

        //keep
        let keep = new Keep();
        keep.leaf = false;
        keep.parent = true;
        data.keep = keep;
        treeModule.setting.data = data;

        //asyc
        let async = new Async();
        async.autoParam = [this.treeOptions.idKey+'=id'];//服务端默认取id
        // async.contentType = "application/json";
        async.dataType = "json";
        async.type = "POST";
        async.url = Application.ubold_sm_sql_bootstrap_ztree;
        async.enable = this.treeOptions.enable;
        async.otherParam =  ["sqlId", this.treeOptions.sqlId,
                "idKey", this.treeOptions.idKey,
                "pIdKey",this.treeOptions.pIdKey,
                "name",this.treeOptions.name,
                "scope",this.treeOptions.scope,
                "enable",this.treeOptions.enable+''];
        treeModule.setting.async = async;
        treeModule.setting.callback = {
            onClick:function(event, treeId, treeNode) {
                        console.info(JSON.stringify(treeNode));
                    }
        }
        return treeModule;
    }

    // 导航按钮点击
    navClick(button: Button) {

        // 判断按钮是否为增删改
        if ('create' == button.id) {
            const modalRef = this.modalService.open(DataViewCreateComponent, { size: "lg" });
            modalRef.result.then((result) => {
                // this.closeResult = `Closed with: ${result}`;
                this.toastr.success(result);
                this.search();
            }, (reason) => {
                // this.search();
                // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
            modalRef.componentInstance.dataViewModule = this.dataViewModule;
            return;
        }

        if ('update' == button.id) {
            //获取选中数据id
            let id = "";

            this.httpService.doPost(Application.ubold_sm_fetch,
                { sqlId: this.dataViewModule.sqlId, id: id }).subscribe(resp => {

                    if (GoldbalConstant.STATUS_CODE.SUCCESS == resp.formViewResolver.code) {
                        const modalRef = this.modalService.open(DataViewCreateComponent, { size: "lg" });
                        modalRef.componentInstance.dataViewModule = this.dataViewModule
                        modalRef.componentInstance.viewModel = resp.result;
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
            return;
        }

        //接口
        if (button.option == GoldbalConstant.OPTIONS_BUTTON.service) {

        }
        //模态窗口
        if (button.option == GoldbalConstant.OPTIONS_BUTTON.modal) {
            let _component = this.createComponentInstance(button.modal);

            // 弹出组件
            const modalRef = this.modalService.open(this.createComponentInstance(_component));
            // modalRef.componentInstance.columOptions = columOptions;
        }
        //新窗口
        if (button.option == GoldbalConstant.OPTIONS_BUTTON.window) {

        }
    }

    // 计算内容宽度
    rightWidth() {
        let maxWidth = 12;
        if (this.treeOptions.show) {
            this.colContentWidth = maxWidth - this.treeOptions.width;
            return;
        }
        this.colContentWidth = maxWidth;
    }
}