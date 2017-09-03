import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
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
import { SimpleData, Key, Data } from "../../metadata/ngb/ngbTree/data.md";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataViewCreateComponent } from "./dataViewCreate.component";
import { Mock } from "../../metadata/constant/mock.constant";
import { NgbTreeComponent } from "../ngb/ngbTree.component";
import { NgbGridComponent } from "../ngb/ngbGrid.component";
import { GoldbalConstant } from "../../metadata/constant/global.constant";
import { ToastrService } from "../../service/basic/toastr.service";

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

    @ViewChild(NgbTreeComponent) ngbTreeComponent: NgbTreeComponent;//树组件
    @ViewChild(NgbGridComponent) ngbGridComponent: NgbGridComponent;//bootstrapTable
    constructor(
         private logger: LoggerService
        ,private httpService: HttpService
        ,private modalService: NgbModal
        ,private fb: FormBuilder
        ,private toastr:ToastrService
        ,private activeModal: NgbActiveModal
    ) {}
    ngOnInit() {
        this.dataViewModule.columns = this.dataViewModule.columns;
        this.dataFilters = this.dataViewModule.dataFilters;
        this.treeOptions =  this.dataViewModule.treeOptions;
        this.options = <BootstrapTableDefaults>this.dataViewModule.options;
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

    //查询列表
    search(){
        let datafilter = this.searchForm.value;
        this.ngbGridComponent.refresh(datafilter);
    }

    //构建ztree
    createTree(){

        // ztree data
        let treeModule = new DataModule();
        treeModule.setting = new Setting();
        
        let data = new Data();
        let simpleData = new SimpleData();
        simpleData.idKey = this.treeOptions.idKey;
        simpleData.pIdKey = this.treeOptions.pIdKey;
        simpleData.enable = true;
        data.simpleData = simpleData;
        
        let key = new Key();
        key.name = this.treeOptions.name;
        key.title = key.name;
        data.key = key;

        treeModule.setting.data = data;
        treeModule.setting.callback = {
            onClick:this.zTreeOnClick
        }

        treeModule.znodes =[
                            {id:1, pId:0, name: "父节点1"},
                            {id:11, pId:1, name: "子节点1"},
                            {id:12, pId:1, name: "子节点2"}
                        ];
        return treeModule;
    }

    //节点点击事件
    zTreeOnClick(event, treeId, treeNode) {
        alert(treeNode.tId + ", " + treeNode.name);
    };

    // 计算内容宽度
    rightWidth(){
      let maxWidth = 12;
      console.info(maxWidth);
      if(this.treeOptions.show){
            this.colContentWidth = maxWidth - this.treeOptions.width;
            return;
      }
       this.colContentWidth = maxWidth;
    }
}