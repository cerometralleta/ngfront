import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { URLSearchParams, Http, Jsonp } from '@angular/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataViewCreateComponent } from './dataViewCreate.component';
import { BaseComponent } from '../../frame/component/base.component';
import { DataModule } from '../../ngb/metadata/ngbTree/dataModule.md';
import { DataFilter, TreeOptions } from '../metadata/dataViewModule.md';
import { BootstrapTableDefaults } from '../../ngb/metadata/ngbGrid/options.md';
import { NgbTreeComponent } from '../../ngb/component/ngbTree.component';
import { NgbGridComponent } from '../../ngb/component/ngbGrid.component';
import { LoggerService } from '../../frame/service/logger.service';
import { HttpService } from '../../frame/service/http.service';
import { ToastrService } from '../../frame/service/toastr.service';
import { ConfirmService } from '../../frame/service/confirm.service';
import { FormVerifiyService } from '../../frame/service/formVerifiy.service';
import { Application } from '../constant/application.constant';
import { ColumOptions } from '../../ngb/metadata/ngbGrid/columnOptions.md';


/**
 * 自定义的DataViewList列表页面
 */
@Component({
    selector: 'sm-dataViewList',
    templateUrl: './dataViewList.component.html'
})
export class DataViewListComponent extends BaseComponent implements OnInit {


    // treeModule
    ztree: DataModule;

    // 查询条件
    dataFilters: Array<DataFilter>;

    // ztree
    treeOptions: TreeOptions;

    // bootstrap table数据
    options: BootstrapTableDefaults;

    // form group
    searchForm: FormGroup;

    @ViewChild(NgbTreeComponent) ngbTreeComponent: NgbTreeComponent; // 树组件
    @ViewChild(NgbGridComponent) ngbGridComponent: NgbGridComponent; // bootstrapTable

    @Input() sqlId: string;
    constructor(
        private logger: LoggerService
        , private httpService: HttpService
        , private activatedRoute: ActivatedRoute
        , private router:Router
        , private modalService: NgbModal
        , private fb: FormBuilder
        , private toastr: ToastrService
        , private confirmService: ConfirmService
        , formVerifiyService: FormVerifiyService
    ) {
        super(formVerifiyService);
     }
    ngOnInit() {

        // 构建bootstrap table
        this.createBootstrap();

        // 构建查询过滤
        this.createSearch();
    }

    createBootstrap() {
        this.options = new BootstrapTableDefaults();
        this.options.height = 0;
        this.options.undefinedText = '-';
        this.options.striped = false;
        this.options.sortStable = false;
        this.options.data = [];
        this.options.method = 'post';
        this.options.url = Application.ubold_sm_sql_dataList;
        this.options.cache = false;
        this.options.queryParamsType = 'undefined';
        this.options.pagination = true;
        this.options.paginationLoop = false;
        this.options.onlyInfoPagination = false;
        this.options.sidePagination = 'server';
        this.options.pageNumber = 1;
        this.options.pageSize = 50;
        this.options.smartDisplay = true;
        this.options.escape = false;
        this.options.search = false;
        this.options.searchOnEnterKey = false;
        this.options.strictSearch = false;
        this.options.searchTimeOut = 3;
        this.options.trimOnSearch = 0;
        this.options.showHeader = true;
        this.options.showFooter = false;
        this.options.showColumns = true;
        this.options.showRefresh = true;
        this.options.showToggle = true;
        this.options.showPaginationSwitch = false;
        this.options.minimumCountColumns = 0;
        this.options.editView = false;
        this.options.cardView = false;
        this.options.detailView = false;
        this.options.clickToSelect = false;
        this.options.singleSelect = true;
        this.options.checkboxHeader = true;
        this.options.maintainSelected = true;
        this.options.sortable = true;
        this.options.silentSort = false;
        this.options.showExport = false;
        const self = this;
        this.options.queryParams = function (params) {
            params.searchArray = self.searchForm.value.searchArray;
            return params;
        }

        this.options.columns = new Array<ColumOptions>();
        const id = new ColumOptions();
        id.field = 'id';
        id.title = 'ID';
        id.checkbox = false;
        id.visible = false;
        this.options.columns.push(id);

        const dataViewCode = new ColumOptions();
        dataViewCode.field = 'dataviewcode';
        dataViewCode.title = '编号';
        dataViewCode.sortable = true;
        this.options.columns.push(dataViewCode);
        const dataViewName = new ColumOptions();
        dataViewName.field = 'dataviewname';
        dataViewName.title = '名称';
        dataViewName.sortable = true;
        this.options.columns.push(dataViewName);

        const sqlId = new ColumOptions();
        sqlId.field = 'sqlid';
        sqlId.title = 'sqlid';
        sqlId.sortable = true;
        this.options.columns.push(sqlId);

        const remark = new ColumOptions();
        remark.field = 'remark';
        remark.title = '备注';
        this.options.columns.push(remark);

        const version = new ColumOptions();
        version.field = 'version';
        version.title = '版本号';
        this.options.columns.push(version);

        const createTime = new ColumOptions();
        createTime.field = 'create_time';
        createTime.title = '创建时间';
        createTime.sortable = true;
        this.options.columns.push(createTime);

        const lastUpdateTime = new ColumOptions();
        lastUpdateTime.field = 'last_update_time';
        lastUpdateTime.title = '更新时间';
        lastUpdateTime.sortable = true;
        this.options.columns.push(lastUpdateTime);
    }

    // 查询对象
    createSearch() {
        this.dataFilters = new Array<DataFilter>();

        // dataViewCode
        const dataViewCode = new DataFilter();
        dataViewCode.title = '编号';
        dataViewCode.field = 'dataViewCode';
        dataViewCode.expression = 'like';
        this.dataFilters.push(dataViewCode);
        // dataViewName
        const dataViewName = new DataFilter();
        dataViewName.title = '名称';
        dataViewName.field = 'dataViewName';
        dataViewName.expression = 'like';
        this.dataFilters.push(dataViewName);
        // sqlId
        const sqlId = new DataFilter();
         sqlId.title = 'sqlId';
        sqlId.field = 'sqlId';
        sqlId.expression = 'like';
        this.dataFilters.push(sqlId);

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

    // 查询列表
    search() {
        const datafilter = this.searchForm.value;
        this.ngbGridComponent.refresh(datafilter);
    }

    // 导航按钮点击
    insert() {
        this.router.navigate(['home', 'dataviewedit', '']);
    }

    update() {
        const _selected = this.ngbGridComponent.getSelections();
        if (_selected < 1) {
            this.toastr.warning('请选择要修改的记录!');
            return;
        }
        this.router.navigate(['home', 'dataviewedit', _selected[0].dataviewcode]);
        // this.router.navigate(['home','dataviewedit',id]);
    }

    get searchArrayControls(){
        const formArray =  <FormArray>this.searchForm.get('searchArray');
        return formArray.controls;
    }
}