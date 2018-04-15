import { Component, OnInit, Input } from '@angular/core';
import { DataViewModule, Button } from '../metadata/dataViewModule.md';
import { LoggerService } from '../../frame/service/logger.service';
import { HttpService } from '../../frame/service/http.service';
import { ToastrService } from '../../frame/service/toastr.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormVerifiyService } from '../../frame/service/formVerifiy.service';
import { BaseComponent } from '../../frame/component/base.component';
import { Application } from '../constant/application.constant';

// 应用数据视图需要集成此类
export class DataViewEditParentComponent extends BaseComponent {
    // 将列表dataViewModule透传
    @Input() dataViewModule: DataViewModule;
    @Input() button: Button;
    // 被修改的数据
    @Input() viewModel: any;
    // 当前操作是否是新增
    insertOptions = false;
    constructor( public activeModal: NgbActiveModal,
        public logger: LoggerService,
        public httpService: HttpService,
        public toastr: ToastrService,
        formVerifiyService: FormVerifiyService){
            super(formVerifiyService);
    }

    // 设置新增标识初始值
    setInsertOptions() {
        if (!this.viewModel) {
            this.viewModel = {};
            this.insertOptions = true;
        }
    }
    // 默认视图新增/修改url
    getDefaultCrudUrl() {
        return Application.baseContext + (this.insertOptions ? Application.ubold_sm_insert : Application.ubold_sm_modfity) 
        + this.dataViewModule.dataViewCode;
    }
}