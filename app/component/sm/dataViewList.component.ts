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
import { ActivatedRoute, Params, Router } from "../../../node_modules/._@angular_router@4.1.1@@angular/router";
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
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";

/**
 * 自定义的DataViewList列表页面
 */
@Component({
    selector: 'sm-dataViewList',
    templateUrl: './app/component/sm/dataViewList.component.html'
})
export class DataViewListComponent implements OnInit {


    // treeModule
    ztree: DataModule;

    // 查询条件
    dataFilters: Array<DataFilter>;

    // ztree
    treeOptions: TreeOptions;

    //bootstrap table数据
    options: BootstrapTableDefaults;

    //form group
    searchForm: FormGroup;

    @ViewChild(NgbTreeComponent) ngbTreeComponent: NgbTreeComponent;//树组件
    @ViewChild(NgbGridComponent) ngbGridComponent: NgbGridComponent;//bootstrapTable

    @Input() sqlId: string;
    constructor(
        private logger: LoggerService
        , private httpService: HttpService
        , private activatedRoute: ActivatedRoute
        , private router:Router
        , private modalService: NgbModal
        , private fb: FormBuilder
        , private toastr: ToastrService
    ) { }
    ngOnInit() {

        //构建bootstrap table
        this.createBootstrap();

        //构建ztree

        //构建查询过滤
        this.createSearch();
    }

    createBootstrap() {
        this.options = new BootstrapTableDefaults();
        this.options.height = 0,
        this.options.undefinedText = "-",
        this.options.striped = false,
        this.options.sortStable = false,
        this.options.data = [],
        this.options.method = "post",
        this.options.url = Application.ubold_sm_sql_dataList,
        this.options.cache = false,
        this.options.queryParamsType = "undefined",
        this.options.pagination = true,
        this.options.paginationLoop = false,
        this.options.onlyInfoPagination = false,
        this.options.sidePagination = "server",
        this.options.pageNumber = 1,
        this.options.pageSize = 50,
        this.options.smartDisplay = true,
        this.options.escape = false,
        this.options.search = false,
        this.options.searchOnEnterKey = false,
        this.options.strictSearch = false,
        this.options.searchTimeOut = 3,
        this.options.trimOnSearch = 0,
        this.options.showHeader = true,
        this.options.showFooter = false,
        this.options.showColumns = true,
        this.options.showRefresh = true,
        this.options.showToggle = true,
        this.options.showPaginationSwitch = false,
        this.options.minimumCountColumns = 0,
        this.options.editView = false,
        this.options.cardView = false,
        this.options.detailView = false,
        this.options.clickToSelect = false,
        this.options.singleSelect = false,
        this.options.checkboxHeader = true,
        this.options.maintainSelected = true,
        this.options.sortable = true,
        this.options.silentSort = false,
        this.options.showExport = false

        this.options.columns = new Array<ColumOptions>();
        let id = new ColumOptions();
        id.field = "id";
        id.title = "ID";
        id.checkbox = false;
        id.visible = false;
        this.options.columns.push(id);

        let dataViewCode = new ColumOptions();
        dataViewCode.field = "dataViewCode";
        dataViewCode.title = "编号";
        dataViewCode.sortable=true;
        this.options.columns.push(dataViewCode);
        
        let dataViewName = new ColumOptions();
        dataViewName.field = "dataViewName";
        dataViewName.title = "名称";
        dataViewName.sortable=true;
        this.options.columns.push(dataViewName);

        let sqlId = new ColumOptions();
        sqlId.field = "sqlId";
        sqlId.title = "sqlId";
        sqlId.sortable=true;
        this.options.columns.push(sqlId);

        let remark = new ColumOptions();
        remark.field = "remark";
        remark.title = "备注";
        this.options.columns.push(remark);

        let version = new ColumOptions();
        version.field = "version";
        version.title = "版本号";
        this.options.columns.push(version);

        let createTime = new ColumOptions();
        createTime.field = "createTime";
        createTime.title = "创建时间";
        createTime.sortable=true;
        this.options.columns.push(createTime);
        
        let lastUpdateTime = new ColumOptions();
        lastUpdateTime.field = "lastUpdateTime";
        lastUpdateTime.title = "更新时间";
        lastUpdateTime.sortable=true;
        this.options.columns.push(lastUpdateTime);

        // let options = new ColumOptions();
        // options.field = "id";
        // options.title = "操作";
        // options.formatter = function(value,row,index){
        //         return ' <button type="button" class="btn btn-default" (click)="update()"> '
		// 		 +'<span class="glyphicon glyphicon-plus" aria-hidden="true">修改</span></button>';
        // }
        // this.options.columns.push(options);
    }

    //查询对象
    createSearch() {
        this.dataFilters = new Array<DataFilter>();

        //dataViewCode 
        let dataViewCode = new DataFilter();
        dataViewCode.title="编号";
        dataViewCode.field = "dataViewCode";
        dataViewCode.expression = "like";
        this.dataFilters.push(dataViewCode);
        //dataViewName 
        let dataViewName = new DataFilter();
        dataViewName.title="名称";
        dataViewName.field = "dataViewName";
        dataViewName.expression = "like";
        this.dataFilters.push(dataViewName);
        //sqlId
        let sqlId = new DataFilter();
         sqlId.title="sqlId";
        sqlId.field = "sqlId";
        sqlId.expression = "like";
        this.dataFilters.push(sqlId);

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

        let key = new Key();
        key.name = this.treeOptions.name;
        key.title = key.name;
        data.key = key;

        treeModule.setting.data = data;
        treeModule.setting.callback = {
            onClick: this.zTreeOnClick
        }

        treeModule.znodes = [
            { id: 1, pId: 0, name: "父节点1" },
            { id: 11, pId: 1, name: "子节点1" },
            { id: 12, pId: 1, name: "子节点2" }
        ];
        return treeModule;
    }

    //节点点击事件
    zTreeOnClick(event, treeId, treeNode) {
        alert(treeNode.tId + ", " + treeNode.name);
    };

    // 导航按钮点击
    insert() {
        this.router.navigate(['home','dataviewedit',""]);
    }

    update() {
        let _selected = this.ngbGridComponent.getSelections();
        if(_selected < 1){
            this.toastr.warning("请选择要修改的记录!");
            return;
        }
        this.router.navigate(['home','dataviewedit',_selected[0].dataViewCode]);
        // this.router.navigate(['home','dataviewedit',id]);
    }
}