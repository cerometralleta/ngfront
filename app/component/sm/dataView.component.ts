import { Component, OnInit, Inject, Input, ViewChild, Type, ComponentFactoryResolver, ElementRef, Renderer } from '@angular/core';
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
import { SelectorComponent } from "./selector.component";
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";
declare var $: any;
/**
 * 统一dataView
 */
@Component({
    selector: 'sm-dataView',
    templateUrl: './app/component/sm/dataView.component.html'
})
export class DataViewComponent extends SelectorComponent {
    constructor(
        public logger: LoggerService
        , public httpService: HttpService
        , public route: ActivatedRoute
        , public modalService: NgbModal
        , public fb: FormBuilder
        , public toastr: ToastrService
        , public componentFactoryResolver: ComponentFactoryResolver
        , public elementRef: ElementRef, renderer: Renderer
    ) {
        super(logger, httpService, modalService, fb, toastr, null);
    }
    operateEvents = {
        'click .RoleOfA': function (e, value, row, index) {
            alert("A");
        },
        'click .RoleOfB': function (e, value, row, index) {
            alert("B");
        },
        'click .RoleOfC': function (e, value, row, index) {
            alert("C");
        },
        'click .RoleOfEdit': function (e, value, row, index) {
        }
    }

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
            var self = this;
            this.options.queryParams = function (params) {
                params.treeOptions = self.treeOptions;
                params.searchArray = self.searchForm.value.searchArray;
                return params;
            }
            this.ztree = this.buildzTree();
            this.createDatafilter();
            this.rowformart();
        });
    }
    ngAfterViewInit(): void { }

    rowformart() {
        if (!(this.buttons.length > 0)) {
            return;
        }
        let column = new ColumOptions();
        column.title = "操作";
        column.field = "_operate";
        column.isInsert = false;
        column.isView = false;
        column.events = this.operateEvents;
        column.updateType = GoldbalConstant.MODIFTY_TYPES.hide;
        var _self = this;
        column.formatter = function (value, row, index) {
            return [
                '<button type="button" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">A权限</button>',
                '<button type="button" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">B权限</button>',
                '<button type="button" class="RoleOfC btn btn-default  btn-sm" style="margin-right:15px;">C权限</button>',
                '<button type="button" class="RoleOfD btn btn-default  btn-sm" style="margin-right:15px;">绑定D</button>',
                '<button type="button" class="RoleOfEdit btn btn-default  btn-sm" style="margin-right:15px;">编辑</button>'
            ].join('');
        }
        this.options.columns.push(column);
    }

    componentFactory(componentName) {
        var factories = Array.from(this.componentFactoryResolver['_factories'].keys());
        var factoryClass = <Type<any>>factories.find((x: any) => x.name == componentName);
        return factoryClass;
    }

    getIdValue(button: Button, id?) {
        if (button.location == GoldbalConstant.LOCATION.row) {
            return id;
        } else {
            var selected = this.getSelections();
            if (!selected) {
                return;
            }
            return selected[0][this.options.uniqueId];
        }
    }

    navClick(button: Button, id?) {
        switch (button.id) {
            case GoldbalConstant.CRUD.create:
                const modalRef = this.modalService.open(DataViewCreateComponent, { size: GoldbalConstant.modal_size_sm });
                modalRef.result.then((result) => {
                    this.toastr.success(result);
                    this.search();
                }, (reason) => { });
                modalRef.componentInstance.dataViewModule = this.dataViewModule;
                return;
            case GoldbalConstant.CRUD.update:
                var _idValue = this.getIdValue(button, id);
                if (!_idValue) {
                    return;
                }
                this.httpService.http.post(Application.ubold_sql_fetch, { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(result => {
                    let resp = result.json();
                    if (GoldbalConstant.STATUS_CODE.SUCCESS == resp.code) {
                        const modalRef = this.modalService.open(DataViewCreateComponent, { size: GoldbalConstant.modal_size_sm });
                        modalRef.componentInstance.dataViewModule = this.dataViewModule
                        modalRef.componentInstance.viewModel = resp.result;
                        modalRef.result.then((result) => {
                            this.toastr.success(result);
                            this.search();
                        }, (reason) => { });
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
                return;
            case GoldbalConstant.CRUD.retrieve:
                var _idValue = this.getIdValue(button, id);
                if (!_idValue) {
                    return;
                }
                this.httpService.http.post(Application.ubold_sql_fetch, { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(result => {
                    let resp = result.json();
                    if (GoldbalConstant.STATUS_CODE.SUCCESS == resp.code) {
                        const modalRef = this.modalService.open(DataViewCreateComponent, { size: GoldbalConstant.modal_size_sm });
                        modalRef.componentInstance.dataViewModule = this.dataViewModule
                        modalRef.componentInstance.viewModel = resp.result;
                        modalRef.componentInstance.isView = true;
                        modalRef.result.then((result) => { }, (reason) => { });
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
                return;
            case GoldbalConstant.CRUD.delete:
                var _idValue = this.getIdValue(button, id);
                if (!_idValue) {
                    return;
                }
                this.httpService.http.post(Application.ubold_sql_delete, { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(result => {
                    let resp = result.json();
                    if (GoldbalConstant.STATUS_CODE.SUCCESS == resp.code) {
                        this.toastr.success(result);
                        this.search();
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
                return;
            default:
                break;
        }
        this.unCrudClick(button, id);
    }

    //非CRUD操作
    unCrudClick(button: Button, id?) {
        var _idValue = this.getIdValue(button, id);
        if (!_idValue) {
            return;
        }
        //根据按钮操作类型处理
        switch (button.option) {
            case GoldbalConstant.OPTIONS_BUTTON.service:
                this.httpService.http.post(button.url, { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(result => {
                    let resp = result.json();
                    if (GoldbalConstant.STATUS_CODE.SUCCESS == resp.code) {
                        this.toastr.success(result);
                        this.search();
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
                break;
            case GoldbalConstant.OPTIONS_BUTTON.modal:
                this.httpService.http.post(Application.ubold_sql_fetch, { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(result => {
                    let resp = result.json();
                    if (GoldbalConstant.STATUS_CODE.SUCCESS == resp.code) {
                        const modalRef = this.modalService.open(this.componentFactory(button.modal), { size: button.size });
                        modalRef.componentInstance.dataViewModule = this.dataViewModule
                        modalRef.componentInstance.viewModel = resp.result;
                        modalRef.result.then((result) => {
                            this.search();
                        }, (reason) => { });
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
                break;
            case GoldbalConstant.OPTIONS_BUTTON.window:
                //TODO..
                break;
            default:
                break;
        }
    }
}