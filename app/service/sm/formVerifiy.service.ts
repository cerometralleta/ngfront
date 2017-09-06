import { Injectable } from '@angular/core';
import { DataViewModule } from "../../metadata/sm/dataViewModule.md";
import { Response } from "../../metadata/response.md";
import { HttpService } from "../basic/http.service";
import { Application } from "../../metadata/constant/application.constant";
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { GoldbalConstant } from "../../metadata/constant/global.constant";


/**
 * FormVerifiyService
 * @ningzk
 */
@Injectable()
export class FormVerifiyService {
    constructor(private httpService: HttpService) { }

    formVerifiy(ngbForm, data?: any) {
        if (!ngbForm) { return; }

        //是否清空message ??
        let formErrors = new Array<string>();

        for (let key in ngbForm.controls) {
            let control = ngbForm.controls[key]

            if (control instanceof FormGroup) {
                Array.prototype.push.apply(formErrors,this.formGroupErrors(control));
            }

            if (control instanceof FormArray) {
                Array.prototype.push.apply(formErrors, this.formArrayErrors(control));
            }

            if (control instanceof FormControl) {
                let errors = this.formControlErrors(key, control);
                if(errors)
                    formErrors.push(errors)
            }
        }
        return formErrors;
    }

    formArrayErrors(formArray) {
        let formErrors = new Array<string>();
        formArray.controls.forEach(element => {
            let errors = this.formGroupErrors(element);
            if(errors.length > 0)
                Array.prototype.push.apply(formErrors,errors);
        });
        return formErrors;
    }

    formGroupErrors(formGrop) {
        let formErrors = new Array<string>();
        for (let name in formGrop.controls) {
            let errors = this.formControlErrors(name, formGrop.controls[name]);
            if(errors){
                formErrors.push(errors);
            }
        }
        return formErrors;
    }

    //获取错误信息
    formControlErrors(name, control) {
        if (control && control.dirty && !control.valid) {

            //control.errors required,minlength
            for (const error in control.errors) {

                //错误信息..
                return `${name}` + GoldbalConstant.ERROR_MESSAGE[error];
            }
        }
    }
}