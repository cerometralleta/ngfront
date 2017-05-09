import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { Application } from "../../metadata/constant/application.constant";
import { DataViewModule } from "../../metadata/sm/dataViewModule.md";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'sm-dataViewEdit',
    templateUrl: './app/component/sm/dataViewEdit.component.html'
})
export class DataViewEditComponent implements OnInit {

    //form group
    ngbForm:FormGroup;
    formData:DataViewModule;

    constructor(private logger: LoggerService, private httpService: HttpService,private fb: FormBuilder) { }
    ngOnInit() { 
        this.formData = new DataViewModule();
        this.buildForm();
    }
    
    //创建form
    buildForm(): void {
        let formGroup = {
            "dataViewCode":[this.formData.dataViewCode,
                [
                    Validators.required,
                    Validators.maxLength(50)
                ]
            ],
            "dataViewName":[this.formData.dataViewName,
                [  Validators.required,
                    Validators.maxLength(50)]
            ],
            "sqlid":[this.formData.sqlid,[
                    Validators.required,
                    Validators.maxLength(50)
            ]],
            "remark":[this.formData.remark,Validators.maxLength(250)]
        };
        this.ngbForm = this.fb.group(formGroup);

        this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: any) {
    if (!this.ngbForm) { return; }
    const form = this.ngbForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'dataViewCode': '',
    'power': ''
  };

  validationMessages = {
    'dataViewCode': {
      'required':      'dataViewCode is required.',
      'minlength':     'dataViewCode must be at least 4 characters long.',
      'maxlength':     'dataViewCode cannot be more than 24 characters long.'
    },
    'power': {
      'required': 'Power is required.'
    }
  };



}