import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../../frame/component/base.component';
import { LoggerService } from '../../frame/service/logger.service';
import { FormVerifiyService } from '../../frame/service/formVerifiy.service';
import { HttpService } from '../../frame/service/http.service';
import { DictConstant } from '../../sm/constant/dict.constant';

@Component({
  selector: 'permission-func',
  templateUrl: './permissionFunc.component.html'
})
export class PermissionFuncComponent extends BaseComponent implements OnInit {

    constructor(
        // public activeModal: NgbActiveModal,
         private fb: FormBuilder
        , private logger: LoggerService
        ,private httpService: HttpService
        , formVerifiyService: FormVerifiyService) {
            super(formVerifiyService);
        }
  @Input() formControl: FormControl;
  statusList: Array<any> = DictConstant.createStatusList();
  ngOnInit() {

    // 更新操作不查询

    this.ngbForm = this.fb.group({
      sqlId: ['', Validators.required]
    });
  }

  onSubmit() {
    //  this.activeModal.close(JSON.stringify(this.ngbForm.value));
  }
}
