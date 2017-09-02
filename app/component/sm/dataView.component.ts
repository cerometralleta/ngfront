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
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataViewCreateComponent } from "./dataViewCreate.component";
import { Mock } from "../../metadata/constant/mock.constant";
import { NgbTreeComponent } from "../ngb/ngbTree.component";
import { NgbGridComponent } from "../ngb/ngbGrid.component";

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
    buttons : Array<Button>;

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
    
    @Input() sqlId: string;
    constructor(
         private logger: LoggerService
        ,private httpService: HttpService
        ,private route: ActivatedRoute
        ,private modalService: NgbModal
        ,private fb: FormBuilder
    ) {

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

    

    ngOnInit() {
        
        // Mock.createDataViewList(this.dataViewModule);

         //监控路由守卫获取初始化数据
        this.route.data.subscribe(resp=>{
            this.dataViewModule = resp.dataViewResolver.result;
            this.dataViewModule.columns = resp.dataViewResolver.result.columns;
            this.buttons =  resp.dataViewResolver.result.buttons;
            this.dataFilters = resp.dataViewResolver.result.dataFilters;
            this.treeOptions =  resp.dataViewResolver.result.treeOptions;
            this.options = resp.dataViewResolver.result.options;
            this.options.columns = resp.dataViewResolver.result.columns;
        });

        this.rightWidth();
        this.ztree = this.createTree();
        this.createSearch();

        // this.route.params.switchMap((parmes: Params) =>

        //     this.httpService.doPost(Application.baseContext + "/" + parmes["sqlid"], "")
        // ).subscribe(res => { // 传递过来的不是promise 所以要subscribe执行
        //     console.log(res);
           
        //     // let resp = res.data() as Response<DataViewModule>;
        //     // this.dataViewModule = resp.result;
        //     // this.treeOptions = this.dataViewModule.treeOptions;
        //     // this.buttons = this.dataViewModule.buttons;
        //     // this.dataFilters = this.dataViewModule.dataFilters;
        // });

      

        // var params = new URLSearchParams();
        // params.set("id", "1");

        // // 传递过来的不是promise 所以要subscribe执行
        // this.httpService.doPost(Application.baseContext, params).subscribe(res => {
        //     console.log(res);
        //     let resp = res.data() as Response<DataViewModule>;
        //     this.dataModule = resp.result;
        //     treeOptions = this.dataModule.treeOptions;
        //     options = this.dataModule.options;
        //     buttons = this.dataModule.buttons;

        //     //grid宽比例
        //     let gridRange = 12 - treeOptions.range

        //     //加载按钮需要的js文件
        //     buttons.forEach(element => {
        //     });

        // });
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

// 导航按钮点击
   navClick(button:Button){

    // 判断按钮是否为增删改
    if('i'==button.id){
        const modalRef = this.modalService.open(DataViewCreateComponent);
        return;
    }

    if('u'==button.id){
         const modalRef = this.modalService.open(DataViewCreateComponent);

         //获取选中数据id
        return;
    }

      //接口
    if(button.option == 'service'){

    }
      //模态窗口
    if(button.option == 'dialog'){

        // 弹出组件
        const modalRef = this.modalService.open(null);
        // modalRef.componentInstance.columOptions = columOptions;
 
      }
      //新窗口
     if(button.option == 'window'){

      }
   }

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