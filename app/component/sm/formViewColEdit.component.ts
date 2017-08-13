import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { DictConstant } from "../../metadata/constant/dict.constant";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from "../../metadata/sm/dataViewModule.md";
import { GUID } from "../../utils/guid.util";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Columns } from "../../metadata/ngb/ngbGrid/columnOptions.md";

@Component({
    selector: 'sm-formViewColEdit',
    templateUrl: './app/component/sm/formViewColEdit.component.html'
})
export class FormViewColEditComponent implements OnInit {
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
        this.ngbForm = this.fb.group({
            field:[col.field],
            title:[col.title],
            updateType:[col.updateType],
            fieldType:[col.fieldType],
            isInsert:[col.isInsert],
            isView:[col.isView],
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