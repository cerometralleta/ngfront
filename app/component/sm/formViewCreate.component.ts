import { Component, OnInit } from '@angular/core';
import { DataViewModule } from "../../metadata/sm/dataViewModule.md";
import { NgbActiveModal, NgbModal } from "._@ng-bootstrap_ng-bootstrap@1.0.0-alpha.25@@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { LoggerService } from "../../service/basic/logger.service";
import { HttpService } from "../../service/basic/http.service";
import { ColumOptions, Columns } from "../../metadata/ngb/ngbGrid/columnOptions.md";
import { Mock } from "../../metadata/constant/mock.constant";
import { FormViewModel } from "../../metadata/sm/formViewModel.md";
import { DictConstant } from "../../metadata/constant/dict.constant";
import { FormViewColEditComponent } from "./formViewColEdit.component";

@Component({
    selector: 'sm-formViewCreate',
    templateUrl: './app/component/sm/formViewCreate.component.html'
})

// 表单创建
export class FormViewCreateComponent implements OnInit {

    // @Input()  formViewModel: FormViewModel;
    constructor(
        // public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private logger: LoggerService,
        private httpService: HttpService,
         private modalService: NgbModal) { }

    //表单数据对象
    formViewModel: FormViewModel
    ngbForm: FormGroup;
    columns:Array<Columns>;
    fieldTypes: Array<any> = DictConstant.createfieldTypes();

    // 数据结构

    ngOnInit() {

        //  数据初始化,从入参获取
        this.formViewModel = new FormViewModel();
        
        // 初始化数据不然会异常
        this.columns = new Array<Columns>();

        this.ngbForm = new FormGroup(this.createFormGroup());

    }

    add(content) {

        //打开新建窗口
        this.modalService.open(FormViewColEditComponent,{ size: "lg" }).result.then((result) => {
            let column = <Columns>result;
            // const controls = <FormArray>this.ngbForm.controls['columns'];
             this.columns.push(column);
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    createFormGroup() {
        let fg = {
            code: new FormControl(this.formViewModel.code, Validators.required),
            sqlId: new FormControl(this.formViewModel.sqlId, Validators.required),
            remark: new FormControl(this.formViewModel.remark)
        };
        return fg;
    }

    onSubmit(){
        //TODO  校验数据
        // console.info(JSON.stringify(this.ngbForm.value));
        this.formViewModel = this.ngbForm.value;
        this.formViewModel.columns = this.columns;
        console.info(JSON.stringify(this.formViewModel));
        // this.activeModal.close(this.ngbForm.value);
    }

}