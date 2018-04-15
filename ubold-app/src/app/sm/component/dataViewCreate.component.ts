import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataViewModule, Button } from '../metadata/dataViewModule.md';
import { ColumOptions } from '../../ngb/metadata/ngbGrid/columnOptions.md';
import { LoggerService } from '../../frame/service/logger.service';
import { HttpService } from '../../frame/service/http.service';
import { ToastrService } from '../../frame/service/toastr.service';
import { GoldbalConstant } from '../constant/global.constant';
import { Application } from '../constant/application.constant';
import { CommonUtils } from '../../frame/utils/common.util';
import { DataViewEditParentComponent } from './DataViewEditParent.component';
import { FormVerifiyService } from '../../frame/service/formVerifiy.service';


@Component({
    selector: 'app-sm-dataview-create',
    templateUrl: './dataViewCreate.component.html'
})
// dataView create/update
export class DataViewCreateComponent extends DataViewEditParentComponent implements OnInit {

    // 操作列
    columns: Array<ColumOptions>;
    formgroups = {};
    // 视图数据
    @Input() isView = false;
    DICT_COMPONENTTYPE = GoldbalConstant.DICT_COMPONENTTYPE;
    constructor(
         activeModal: NgbActiveModal,
         logger: LoggerService,
         httpService: HttpService,
         toastr: ToastrService, formVerifiyService: FormVerifiyService, private fb: FormBuilder) {
            super(activeModal, logger, httpService, toastr, formVerifiyService);
    }

    ngOnInit() {
        this.columns = this.dataViewModule.columns;
        this.setInsertOptions();
        this.columnfilter();
        this.createFormGroup();
        this.ngbForm = new FormGroup(this.formgroups);
        // this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
    // onValueChanged(data?: any){ }
    columnfilter() {
        const cols = new Array<ColumOptions>();
        this.columns.forEach(col => {

            // 修改idfield,version默认hidden
            if (!this.insertOptions
                && (col.field === this.dataViewModule.options.idField
                    || col.field === this.dataViewModule.options.version)) {
                col.fieldType = GoldbalConstant.DICT_COMPONENTTYPE.hidden;
                cols.push(col);
            } else if (this.elementVisible(col)) {
                cols.push(col);
            }
        });
        this.columns = cols;
    }

    onSubmit() {
        this.httpService.doPost(CommonUtils.urlconvert(this.button.url),
        this.ngbForm.value)
        .subscribe(response => {
            if (GoldbalConstant.STATUS_CODE.SUCCESS === response.code) {
                this.activeModal.close(response.message);
            } else {
                this.toastr.error(response.message);
            }
        });
    }

    // 表单元素是否显示
    elementVisible(column: ColumOptions) {
        if (this.isView) {
            return column.view;
        }
        const result = this.insertOptions ? column.insert : column.updateType !== GoldbalConstant.MODIFTY_TYPES.hide;
        return result;
    }

    // 修改操作设置数据 disable
    elementDisabled(el: ColumOptions){
        if (this.insertOptions || this.isView) {
            return false;
        }
        return el.updateType === GoldbalConstant.MODIFTY_TYPES.disable;
    }

    createFormGroup() {
        this.columns.forEach(element => {
            // fg[element.field] = new FormControl(this.viewModel[element.field], <any>Validators.required),

            // 表单验证
            const array = this.createValidators(element);
            if (element.maxlength) {
                array.push(Validators.maxLength(element.maxlength));
            }
            this.formgroups[element.field] = new FormControl({value: this.viewModel[element.field],
                disabled: this.elementDisabled(element) }, array);
        });
    }

    // 获取错误信息
    getErrorMessage(column) {
        if (!this.formgroups[column.field].errors) {
            return;
        }
        const control = this.formgroups[column.field];
        const validators = JSON.parse(column.pattern);
        if (control.errors.required) {
            return validators[GoldbalConstant.VALIDATORS.required];
        } else if (control.errors.email) {
            return validators[GoldbalConstant.VALIDATORS.email];
        } else {
            // requiredPattern 默认添加 ^,$
            const pattern = control.errors.pattern.requiredPattern;
            return validators[pattern.substring(1, pattern.length - 1)];
        }
    }

    // 创建表单验证
    createValidators(col) {
        const array = [];
        if (!col.pattern) {
            return array;
        }
        const validators = JSON.parse(col.pattern);
        for (const pattern in validators) {
            if (validators.hasOwnProperty(pattern)) {
                switch (pattern) {
                    case GoldbalConstant.VALIDATORS.required:
                        array.push(Validators.required);
                        break;
                    case GoldbalConstant.VALIDATORS.email:
                        array.push(Validators.email);
                        break;
                    default:
                        array.push(Validators.pattern(pattern));
                        break;
                }
            }
        }
        return array;
    }
}