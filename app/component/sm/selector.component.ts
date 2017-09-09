import { Component, OnInit, Inject, Input, ViewChild, ChangeDetectorRef, enableProdMode } from '@angular/core';
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
declare var $: any;
//Error: ExpressionChangedAfterItHasBeenCheckedError: 
//Expression has changed after it was checked. Previous value: 'true'. Current value: 'false'
enableProdMode();
/**
 * dataView选择器
 */
@Component({
    selector: 'sm-selector',
    templateUrl: './app/component/sm/selector.component.html'
})
export class SelectorComponent implements OnInit {

    //页面数据
    @Input() dataViewModule: DataViewModule;

    // 树操作
    treeOptions: TreeOptions;

    // 查询条件
    dataFilters: Array<DataFilter>;

    // 内容区域宽度
    colContentWidth : number;

    // treeModule
    ztree : DataModule;

    //bootstrap table数据
    options:BootstrapTableDefaults;
    
    //form group
    searchForm: FormGroup;
    buttons: Array<Button>;

    @ViewChild(NgbTreeComponent) ngbTreeComponent: NgbTreeComponent;//树组件
    @ViewChild(NgbGridComponent) ngbGridComponent: NgbGridComponent;//bootstrapTable
    constructor(
         public logger: LoggerService
        ,public httpService: HttpService
        ,public modalService: NgbModal
        ,public fb: FormBuilder
        ,public toastr:ToastrService
        ,public activeModal: NgbActiveModal
    ) {

    }
    ngOnInit() {
        this.buttons = new Array<Button>();
        this.dataFilters = this.dataViewModule.dataFilters;
        this.treeOptions =  this.dataViewModule.treeOptions;
        this.options = <BootstrapTableDefaults>this.dataViewModule.options;
        var self  = this;
        this.options.queryParams = function(params){

            //ztree初始查询参数
            params.treeOptions = self.treeOptions;
            return params;
        }
        this.options.columns = this.dataViewModule.columns;

        //计算右边宽度
        this.rightWidth();

        //构建树
        this.ztree = this.createTree();
        
        //构建查询过滤
        this.createSearch();
    }

    //获取选中行
    getSelections(){
        let selected = this.ngbGridComponent.getSelections();
        if(selected.length < 1){
            this.toastr.warning("请选择记录");
            return;
        }
        this.activeModal.close(selected);
    }

    //返回当前DataViewModel
    getDataViewModule(){
        return this.dataViewModule;
    }

    //查询对象
    createSearch(){
        let formArray = new Array<any>();
        this.dataFilters.forEach(datafilter => {
             formArray.push(this.fb.group({
                 value: [datafilter.value],
                 field: [datafilter.field],
                 expression: [datafilter.expression],
                 title: [datafilter.title]
            }))
        });
        this.searchForm =  this.fb.group({searchArray : this.fb.array(formArray)});
    }

     // 计算内容宽度
    rightWidth(){
      let maxWidth = 12;
      if(this.treeOptions.show){
            this.colContentWidth = maxWidth - this.treeOptions.width;
            return;
      }
       this.colContentWidth = maxWidth;
    }

     //查询列表
    search(nodeId?) {
        let datafilter = this.searchForm.value;
        datafilter.treeOptions = this.treeOptions;
        if(nodeId){
            this.treeOptions.nodeValue = nodeId;
        }
        this.ngbGridComponent.refresh(datafilter);
    }

    //构建ztree
    createTree() {

        // ztree data
        let treeModule = new DataModule();
        treeModule.setting = new Setting();

        let data = new Data();
        data.simpleData = new SimpleData();
        data.simpleData.idKey = this.treeOptions.idKey;
        data.simpleData.pIdKey = this.treeOptions.pIdKey;
        data.simpleData.enable = true;

        //ztree key
        data.key = new Key();
        data.key.name = this.treeOptions.name;
        data.key.title = data.key.name;

        //keep
        data.keep = new Keep();
        data.keep.leaf = false;
        data.keep.parent = true;
        treeModule.setting.data = data;

        //asyc
        let async = new Async();
        async.autoParam = [this.treeOptions.idKey+'=id'];//服务端默认取id
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
         
        var self = this;
        treeModule.setting.callback = {
            onClick:function(event, treeId, treeNode) {
                        self.search(treeNode[data.simpleData.idKey]);
                    },
            onAsyncSuccess: function(event, treeId, treeNode, msg) {
                
                 //默认展开第一个结点    
                if(!treeNode){
                    var treeObj = $.fn.zTree.getZTreeObj(treeId);
                    treeObj.expandNode(treeObj.getNodes()[0], true);    
                }
            }
        }
        return treeModule;
    }
}