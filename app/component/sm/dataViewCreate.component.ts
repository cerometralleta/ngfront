import { Component, OnInit, Input } from '@angular/core';
import { DataViewModule } from "../../metadata/sm/dataViewModule.md";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { LoggerService } from "../../service/basic/logger.service";
import { HttpService } from "../../service/basic/http.service";
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";
import { Mock } from "../../metadata/constant/mock.constant";
import { Application } from "../../metadata/constant/application.constant";
import { GoldbalConstant } from "../../metadata/constant/global.constant";
import { ToastrService } from "../../service/basic/toastr.service";

@Component({
    selector: 'sm-dataViewCreate',
    templateUrl: './app/component/sm/dataViewCreate.component.html'
})
// dataView create/update
export class DataViewCreateComponent implements OnInit {

    //将列表dataViewModule透传
    @Input() dataViewModule: DataViewModule;
    ngbForm: FormGroup;

    //操作列
    columns: Array<ColumOptions>;

    //视图数据
    @Input() viewModel: any;
    @Input() isView: boolean = false;
    insert: boolean = false;

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
        this.ngbForm = new FormGroup(this.createFormGroup());
        // this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
    // onValueChanged(data?: any){ }
    columnfilter() {
        let cols = new Array<ColumOptions>();
        this.columns.forEach(col => {
            if (this.colstatus(col)) {
                cols.push(col);
            }
        });
        this.columns = cols;
    }

    onSubmit() {
        console.info(JSON.stringify(this.ngbForm.value))
        let url = this.insert ? Application.ubold_sm_insert : Application.ubold_sm_modfity;
        this.httpService.http.post(url + this.dataViewModule.dataViewCode, this.ngbForm.value).subscribe(resp => {
            let response = resp.json();
            if (GoldbalConstant.STATUS_CODE.SUCCESS == response.code) {
                this.activeModal.close(response.message);
            } else {
                this.toastr.error(response.message);
            }
        });
    }

    colstatus(column:ColumOptions) {
        if (this.isView) {
            return column.view;
        }
        let result = this.insert ? column.insert : column.updateType != GoldbalConstant.MODIFTY_TYPES.hide;
        return result;
    }

    createFormGroup() {
        let fg = {};
        var array = [];
        this.columns.forEach(element => {
            // fg[element.field] = new FormControl(this.viewModel[element.field], <any>Validators.required),
            if (element.pattern) {
                array.push(Validators.pattern(element.pattern));
            }
            if(element.maxlength){
                array.push(Validators.maxLength(element.maxlength));
            }
            fg[element.field] = new FormControl(this.viewModel[element.field],array);
        });
        return fg;
    }

}