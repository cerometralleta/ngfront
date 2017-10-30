import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataViewModule } from '../metadata/dataViewModule.md';
import { ColumOptions } from '../../ngb/metadata/ngbGrid/columnOptions.md';
import { LoggerService } from '../../frame/service/logger.service';
import { HttpService } from '../../frame/service/http.service';
import { ToastrService } from '../../frame/service/toastr.service';
import { GoldbalConstant } from '../constant/global.constant';
import { Application } from '../constant/application.constant';


@Component({
    selector: 'app-sm-dataview-create',
    templateUrl: './dataViewCreate.component.html'
})
// dataView create/update
export class DataViewCreateComponent implements OnInit {

    // 将列表dataViewModule透传
    @Input() dataViewModule: DataViewModule;
    ngbForm: FormGroup;

    // 操作列
    columns: Array<ColumOptions>;
    formgroups = {};
    // 视图数据
    @Input() viewModel: any;
    @Input() isView = false;
    insert = false;
    DICT_COMPONENTTYPE = GoldbalConstant.DICT_COMPONENTTYPE;
    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private logger: LoggerService,
        private httpService: HttpService,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.columns = this.dataViewModule.columns;
        // this.columns = Mock.createColumn();
        if (!this.viewModel) {
            this.insert = true;
            this.viewModel = {};
        }
        this.columnfilter();
        this.createFormGroup()
        this.ngbForm = new FormGroup(this.formgroups);
        // this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
    // onValueChanged(data?: any){ }
    columnfilter() {
        const cols = new Array<ColumOptions>();
        this.columns.forEach(col => {

            // 修改idfield,version默认hidden
            if (!this.insert
                && (col.field === this.dataViewModule.options.idField
                    || col.field === this.dataViewModule.options.version)) {
                col.fieldType = GoldbalConstant.DICT_COMPONENTTYPE.hidden;
                cols.push(col);
            } else if (this.colstatus(col)) {
                cols.push(col);
            }
        });
        this.columns = cols;
    }

    onSubmit() {
        // console.info(JSON.stringify(this.ngbForm.value));
        const url = this.insert ? Application.ubold_sm_insert : Application.ubold_sm_modfity;
        this.httpService.doPost(url + this.dataViewModule.dataViewCode, this.ngbForm.value).subscribe(response => {
            if (GoldbalConstant.STATUS_CODE.SUCCESS === response.code) {
                this.activeModal.close(response.message);
            } else {
                this.toastr.error(response.message);
            }
        });
    }

    colstatus(column: ColumOptions) {
        if (this.isView) {
            return column.view;
        }
        const result = this.insert ? column.insert : column.updateType !== GoldbalConstant.MODIFTY_TYPES.hide;
        return result;
    }

    createFormGroup() {
        this.columns.forEach(element => {
            // fg[element.field] = new FormControl(this.viewModel[element.field], <any>Validators.required),

            //表单验证
            const array = this.createValidators(element);
            if (element.maxlength) {
                array.push(Validators.maxLength(element.maxlength));
            }
            // errors
            this.formgroups[element.field] = new FormControl(this.viewModel[element.field], array);
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
            return validators['required'];
        } else if (control.errors.email) {
            return validators['email'];
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
                    case 'required':
                        array.push(Validators.required);
                        break;
                    case 'email':
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