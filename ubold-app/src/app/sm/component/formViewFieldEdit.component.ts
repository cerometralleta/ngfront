import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DictConstant } from '../constant/dict.constant';
import { Columns } from '../../ngb/metadata/ngbGrid/columnOptions.md';

/**
 * 创建formView Field
 */
@Component({
    selector: 'sm-formViewFieldEdit',
    templateUrl: './formViewFieldEdit.component.html'
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
        const col = new Columns();
        col.updateType = 'enable';
        col.fieldType = 'text';
        col.idx = 1;
        this.ngbForm = this.fb.group({
            field: [col.field, Validators.required],
            title: [col.title, Validators.required],
            updateType: [col.updateType, Validators.required],
            fieldType: [col.fieldType, Validators.required],
            isInsert: [col.insert],
            isView: [col.view],
            maxlength: [col.maxlength],
            idx: [col.idx]
         });
     }

    onSubmit(){
        // TODO  校验数据
        console.info(JSON.stringify(this.ngbForm.value));
        this.activeModal.close(this.ngbForm.value);
    }

}