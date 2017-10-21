import { Component, OnInit, Inject, Input, ViewChild, Type, ComponentFactoryResolver, ElementRef, Renderer } from '@angular/core';
import { URLSearchParams, Http, Jsonp } from '@angular/http';
import { HttpService } from '../../service/basic/http.service';
import { Application } from '../../metadata/constant/application.constant';
import { LoggerService } from '../../service/basic/logger.service';
import { ButtonType } from '../../metadata/constant/buttonType.constant';
import { GUID } from '../../utils/guid.util';
import { Response } from '../../metadata/response.md';
import { Options, BootstrapTableDefaults } from '../../metadata/ngb/ngbGrid/options.md';
import { Setting, DataModule } from '../../metadata/ngb/ngbTree/dataModule.md';
import { DataViewModule, TreeOptions, Button, DataFilter } from '../../metadata/sm/dataViewModule.md';
import 'rxjs/add/operator/switchMap';
import { SimpleData, Key, Data, Keep } from '../../metadata/ngb/ngbTree/data.md';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataViewCreateComponent } from './dataViewCreate.component';
import { Mock } from '../../metadata/constant/mock.constant';
import { NgbTreeComponent } from '../ngb/ngbTree.component';
import { NgbGridComponent } from '../ngb/ngbGrid.component';
import { GoldbalConstant } from '../../metadata/constant/global.constant';
import { ToastrService } from '../../service/basic/toastr.service';
import { Async } from '../../metadata/ngb/ngbTree/async.md';
import { SelectorComponent } from './selector.component';
import { ColumOptions } from '../../metadata/ngb/ngbGrid/columnOptions.md';
import { ConfirmService } from '../../service/basic/confirm.service';
import { CommonUtils } from '../../utils/common.util';
import { FormVerifiyService } from '../../service/sm/formVerifiy.service';
import { Resolve, ActivatedRoute, Router } from '@angular/router';
declare var $: any;
/**
 * 统一dataView
 */
@Component({
    selector: 'sm-dataView',
    templateUrl: './dataView.component.html'
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
        , public elementRef: ElementRef
        , public renderer: Renderer
        , public confirmService :ConfirmService
        , formVerifiyService: FormVerifiyService
    ) {
        super(logger, httpService, modalService, fb, toastr, null,formVerifiyService);
    }
    operateEvents: any = {};
    _toolbar: Array<Button>;
    ngOnInit() {
        // Mock.createDataViewList(this.dataViewModule);

        // 监控路由守卫获取初始化数据
        this.route.data.subscribe(resp => {
            this.dataViewModule = resp.dataViewResolver.result;
            this.dataViewModule.columns = resp.dataViewResolver.result.columns;
            this.buttons = resp.dataViewResolver.result.buttons;
            this.dataFilters = resp.dataViewResolver.result.dataFilters;
            this.treeOptions = resp.dataViewResolver.result.treeOptions;
            this.options = resp.dataViewResolver.result.options;
            this.options.columns = resp.dataViewResolver.result.columns;
            const self = this;
            this.createQueryParams(self);
            this.createTreeModule();
            this.createDatafilter();
            this.operateformart();
            this.createToolbar();
        });
    }
    ngAfterViewInit(): void { }
    createToolbar(){
        this._toolbar = new Array();
        this.buttons.forEach(btn => {
            if(btn.location == GoldbalConstant.LOCATION.nav){
                this._toolbar.push(btn);
            }
        });
    }

    operateformart() {
        if (!(this.buttons.length > 0)) {
            return;
        }
        const column = new ColumOptions();
        column.title = '操作';
        column.field = '_operate';
        column.insert = false;
        column.view = false;
        column.align = 'center';
        column.events = this.operateEvents;
        column.updateType = GoldbalConstant.MODIFTY_TYPES.hide;
        var _self = this;
        column.formatter = function (value, row, index) {
            var _array = [];
            var idx = 0;
            _self.buttons.forEach(btn => {
                if (btn.location == GoldbalConstant.LOCATION.row) {
                    _array[idx] = '<button type="button" class="Role_' + btn.id + ' btn '+btn.color+' '+btn.btnsize+ '" style="margin-right:15px;">' +
                    '<i class="' +btn.icon + ' m-r-5"></i>' +
                     btn.title + '</button>';
                    _self.operateEvents['click .Role_' + btn.id] = function (e, value, row, index) {
                        _self.navClick(btn, row[_self.options.idField]);
                    }
                    idx++;
                }
            });
            return _array.join('');
        };
        this.options.columns.push(column);
    }

    componentFactory(componentName) {
        const factories = Array.from(this.componentFactoryResolver['_factories'].keys());
        const factoryClass = <Type<any>>factories.find((x: any) => x.name == componentName);
        return factoryClass;
    }

    getIdValue(button: Button, id?) {
        if (button.location == GoldbalConstant.LOCATION.row) {
            return id;
        } else {
            const selected = this.getSelections();
            if (!selected) {
                return;
            }
            return selected[0][this.options.idField];
        }
    }

    navClick(button: Button, id?) {
        let _idValue;
        let modalRef;
        switch (button.id) {
            case GoldbalConstant.CRUD.create:
                modalRef = this.modalService.open(DataViewCreateComponent, { size: GoldbalConstant.modal_size_lg });
                modalRef.result.then((result) => {
                    this.toastr.success(result);
                    this.search();
                    this.refreshNode();
                }, (reason) => { });
                modalRef.componentInstance.dataViewModule = this.dataViewModule;
                return;
            case GoldbalConstant.CRUD.update:
                 _idValue = this.getIdValue(button, id);
                if (!_idValue) {
                    return;
                }
                this.httpService.doPost(CommonUtils.urlConvert(button.url, Application.ubold_sql_fetch), 
                { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(resp => {
                    if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                        const modalRef = this.modalService.open(DataViewCreateComponent, { size: GoldbalConstant.modal_size_lg });
                        modalRef.componentInstance.dataViewModule = this.dataViewModule;
                        modalRef.componentInstance.viewModel = resp.result;
                        modalRef.result.then((result) => {
                            this.toastr.success(result);
                            this.search();
                             this.refreshNode();
                        }, (reason) => { });
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
                return;
            case GoldbalConstant.CRUD.retrieve:
                 _idValue = this.getIdValue(button, id);
                if (!_idValue) {
                    return;
                }
                this.httpService.doPost(CommonUtils.urlConvert(button.url, Application.ubold_sql_fetch), 
                { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(resp => {
                    if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                        modalRef = this.modalService.open(DataViewCreateComponent, { size: GoldbalConstant.modal_size_lg });
                        modalRef.componentInstance.dataViewModule = this.dataViewModule;
                        modalRef.componentInstance.viewModel = resp.result;
                        modalRef.componentInstance.isView = true;
                        modalRef.result.then((result) => { }, (reason) => { });
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
                return;
            case GoldbalConstant.CRUD.delete:
                 _idValue = this.getIdValue(button, id);
                if (!_idValue) {
                    return;
                }
                this.confirmService.confirm('确认', '确定要删除吗?').then((result) => {
                    this.httpService.doPost(CommonUtils.urlConvert(button.url, Application.ubold_sql_delete) + this.dataViewModule.dataViewCode, { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(resp => {
                        if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                            this.toastr.success(resp.message);
                            this.search();
                             this.refreshNode();
                        } else {
                            this.toastr.error(resp.message);
                        }
                    });
                }, (reason) => { });
                return;
            default:
                break;
        }
        this.unCrudClick(button, id);
    }

    // 非CRUD操作
    unCrudClick(button: Button, id?) {
        const _idValue = this.getIdValue(button, id);
        if (!_idValue) {
            return;
        }
        // 根据按钮操作类型处理
        switch (button.option) {
            case GoldbalConstant.OPTIONS_BUTTON.service:
                this.httpService.doPost(button.url, { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(resp => {
                    if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                        this.toastr.success(resp.message);
                        this.search();
                        this.refreshNode();
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
                break;
            case GoldbalConstant.OPTIONS_BUTTON.modal:
                this.httpService.doPost(Application.ubold_sql_fetch, { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(resp => {
                    if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                        const modalRef = this.modalService.open(this.componentFactory(button.modal), { size: button.size });
                        modalRef.componentInstance.dataViewModule = this.dataViewModule;
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
                // TODO..
                break;
            default:
                break;
        }
    }
}