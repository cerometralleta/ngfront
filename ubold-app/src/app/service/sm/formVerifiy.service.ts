import { Injectable } from '@angular/core';
import { DataViewModule } from '../../metadata/sm/dataViewModule.md';
import { Response } from '../../metadata/response.md';
import { HttpService } from '../basic/http.service';
import { Application } from '../../metadata/constant/application.constant';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GoldbalConstant } from '../../metadata/constant/global.constant';


/**
 * FormVerifiyService
 * @ningzk
 */
@Injectable()
export class FormVerifiyService {
    constructor(private httpService: HttpService) { }

    formVerifiy(ngbForm, data?: any) {
        if (!ngbForm) { return; }

        // 是否清空message ??
        const formErrors = new Array<string>();
        // tslint:disable-next-line:forin
        for (const key in ngbForm.controls) {
            const control = ngbForm.controls[key];

            if (control instanceof FormGroup) {
                Array.prototype.push.apply(formErrors, this.formGroupErrors(control, data));
            }

            if (control instanceof FormArray) {
                Array.prototype.push.apply(formErrors, this.formArrayErrors(control, data));
            }

            if (control instanceof FormControl) {
                const errors = this.formControlErrors(key, control, data);
                // tslint:disable-next-line:curly
                if (errors)
                    formErrors.push(errors);
            }
        }
        return formErrors;
    }

    formArrayErrors(formArray, data?: any) {
        const formErrors = new Array<string>();
        formArray.controls.forEach(element => {
            const errors = this.formGroupErrors(element, data);
            // tslint:disable-next-line:curly
            if (errors.length > 0)
                Array.prototype.push.apply(formErrors, errors);
        });
        return formErrors;
    }

    formGroupErrors(formGrop, data?: any) {
        const formErrors = new Array<string>();
        // tslint:disable-next-line:forin
        for (const name in formGrop.controls) {
            const errors = this.formControlErrors(name, formGrop.controls[name], data);
            if (errors){
                formErrors.push(errors);
            }
        }
        return formErrors;
    }

    //获取错误信息
    formControlErrors(name, control, data?: any) {
        if (!control.valid) {

            // control.errors required,minlength
            for (const error in control.errors) {

                // 错误信息..
                return `${name}` + GoldbalConstant.ERROR_MESSAGE[error];
            }
        }
    }
}