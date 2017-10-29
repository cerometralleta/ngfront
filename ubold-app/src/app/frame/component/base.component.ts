import { AfterViewInit } from '@angular/core';
import { FormVerifiyService } from '../service/formVerifiy.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
export class BaseComponent implements AfterViewInit {

    // form group
    ngbForm: FormGroup;
    formErrors: Array<string>;
    constructor(private formVerifiyService: FormVerifiyService){
    }

    ngAfterViewInit(): void {
       this.jsPlugin();
    }

    // js插件初始化
    jsPlugin(){
        $.fn.popover && $('[data-toggle="popover"]').popover();
    }

  // 表单变更
  onValueChanged(data?: any) {
    if (!this.ngbForm) { return; }
    this.formErrors = this.formVerifiyService.formVerifiy(this.ngbForm, data);
  }
}