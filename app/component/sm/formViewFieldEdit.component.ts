import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { DictConstant } from "../../metadata/constant/dict.constant";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from "../../metadata/sm/dataViewModule.md";
import { GUID } from "../../utils/guid.util";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Columns } from "../../metadata/ngb/ngbGrid/columnOptions.md";


/**
 * 创建formView Field
 */
@Component({
    selector: 'sm-formViewFieldEdit',
    templateUrl: './app/component/sm/formViewFieldEdit.component.html'
})
export class FormViewFieldEditComponent implements OnInit {
     ngbForm: FormGroup;
     updateTypes: Array<any> = DictConstant.createUpdateTypes();
     fieldTypes: Array<any> = DictConstant.createfieldTypes();

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder
        ) {

     }

    ngOnInit() {

        let col = new Columns();
        col.updateType = 'enable';
        col.fieldType = 'text';
        col.idx = 1;
        this.ngbForm = this.fb.group({
            field:[col.field,Validators.required],
            title:[col.title,Validators.required],
            updateType:[col.updateType,Validators.required],
            fieldType:[col.fieldType,Validators.required],
            isInsert:[col.insert],
            isView:[col.view],
            maxlength:[col.maxlength],
            idx:[col.idx]
         });
     }

    onSubmit(){
        //TODO  校验数据
        console.info(JSON.stringify(this.ngbForm.value));
        this.activeModal.close(this.ngbForm.value);
    }

}