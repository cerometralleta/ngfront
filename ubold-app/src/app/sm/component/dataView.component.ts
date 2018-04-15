import { Component, OnInit, Inject, Input, ViewChild, Type, ComponentFactoryResolver, ElementRef, Renderer } from '@angular/core';
import { URLSearchParams, Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataViewCreateComponent } from './dataViewCreate.component';
import { SelectorComponent } from './selector.component';
import { Resolve, ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from '../../frame/service/logger.service';
import { HttpService } from '../../frame/service/http.service';
import { ToastrService } from '../../frame/service/toastr.service';
import { ConfirmService } from '../../frame/service/confirm.service';
import { FormVerifiyService } from '../../frame/service/formVerifiy.service';
import { Button } from '../metadata/dataViewModule.md';
import { GoldbalConstant } from '../constant/global.constant';
import { ColumOptions } from '../../ngb/metadata/ngbGrid/columnOptions.md';
import { CommonUtils } from '../../frame/utils/common.util';
import { Application } from '../constant/application.constant';
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
        , public confirmService: ConfirmService
        , formVerifiyService: FormVerifiyService
    ) {
        super(logger, httpService, modalService, fb, toastr, null,formVerifiyService);
    }
    operateEvents: any = {};
    _toolbar: Array<Button>;
    ngOnInit() {
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
            if(btn.position === GoldbalConstant.LOCATION.nav){
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
        const _self = this;
        column.formatter = function (value, row, index) {
            const _array = [];
            let idx = 0;
            _self.buttons.forEach(btn => {
                if (btn.position === GoldbalConstant.LOCATION.row) {
                    _array[idx] = '<button type="button" class="Role_' + btn.id + ' btn ' + btn.color + ' ' +
                    btn.btnsize + '" style="margin-right:15px;">' +
                    '<i class="' + btn.icon + ' m-r-5"></i>' +
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
        const factoryClass = <Type<any>>factories.find((x: any) => x.name === componentName);
        return factoryClass;
    }

    getIdValue(button: Button, id?) {
        if (button.position === GoldbalConstant.LOCATION.row) {
            return id;
        }
        return this.getSelections()[0][this.options.idField];
    }

    getNgbModalRef(button: Button){
        let modalRef = DataViewCreateComponent;
        if (GoldbalConstant.OPTIONS_BUTTON.modal === button.option && 
            button.modal !== ''){
                modalRef = this.componentFactory(button.modal);
        }
        const ngbModalRef =  this.modalService.open(modalRef, { size: GoldbalConstant.modal_size_lg });
        ngbModalRef.componentInstance.dataViewModule = this.dataViewModule;
        ngbModalRef.componentInstance.button = button;
        return ngbModalRef;
    }

    ngbModalRefClose(ngbModalRef){
        ngbModalRef.result.then((result) => {
            this.toastr.success(result);
            this.refreshParentModel();
        }, (reason) => { });
    }
    refreshParentModel(){
        this.search();
        this.refreshNode();
    }

    navClick(button: Button, id?) {
        let _idValue;
        let modalRef;
        switch (button.id) {
            case GoldbalConstant.CRUD.create:
                modalRef = this.getNgbModalRef(button);
                this.ngbModalRefClose(modalRef);
                return;
            case GoldbalConstant.CRUD.update:
                 _idValue = this.getIdValue(button, id);
                this.httpService.doPost(Application.ubold_sql_fetch,
                { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(resp => {
                    if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                        modalRef = this.getNgbModalRef(button);
                        modalRef.componentInstance.viewModel = resp.result;
                        this.ngbModalRefClose(modalRef);
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
                return;
            case GoldbalConstant.CRUD.retrieve:
                 _idValue = this.getIdValue(button, id);
                this.httpService.doPost(Application.ubold_sql_fetch,
                { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(resp => {
                    if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                        modalRef = this.getNgbModalRef(button);
                        modalRef.componentInstance.viewModel = resp.result;
                        modalRef.componentInstance.isView = true;
                    } else {
                        this.toastr.error(resp.message);
                    }
                });
                return;
            case GoldbalConstant.CRUD.delete:
                 _idValue = this.getIdValue(button, id);
                this.confirmService.confirm('确认', '确定要删除吗?').then((result) => {
                    this.httpService.doPost(CommonUtils.urlconvert(button.url),
                    { sqlId: this.dataViewModule.sqlId, id: _idValue }).subscribe(resp => {
                        if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                            this.toastr.success(resp.message);
                            this.refreshParentModel();
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
        // 根据按钮操作类型处理
        switch (button.option) {
            case GoldbalConstant.OPTIONS_BUTTON.service:
                 const _idValues = new Array();
                 if (id){
                    _idValues.push(id);
                 }else{
                    this.getSelections().forEach(function(currentValue, index, arr){
                        _idValues.push(currentValue[this.options.idField]);
                    }, this);
                 }
                this.confirmService.confirm('确认', '确定要' + button.title + '吗?').then((result) => {
                    this.httpService.doPost(button.url, { sqlId: this.dataViewModule.sqlId, ids: _idValues }).subscribe(resp => {
                        if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                            this.toastr.success(resp.message);
                            this.refreshParentModel();
                        } else {
                            this.toastr.error(resp.message);
                        }
                    });
                }, (reason) => { });
                break;
            case GoldbalConstant.OPTIONS_BUTTON.modal:
                if(GoldbalConstant.LOCATION.nav === button.position){
                    const modalRef = this.modalService.open(this.componentFactory(button.modal), { size: button.size });
                    modalRef.componentInstance.dataViewModule = this.dataViewModule;
                    modalRef.componentInstance.button = button;
                    this.ngbModalRefClose(modalRef);
                    return;
                }
                this.httpService.doPost(Application.ubold_sql_fetch, { sqlId: this.dataViewModule.sqlId, id: id }).subscribe(resp => {
                    if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                        const modalRef = this.modalService.open(this.componentFactory(button.modal), { size: button.size });
                        modalRef.componentInstance.dataViewModule = this.dataViewModule;
                        modalRef.componentInstance.button = button;
                        modalRef.componentInstance.viewModel = resp.result;
                        this.ngbModalRefClose(modalRef);
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