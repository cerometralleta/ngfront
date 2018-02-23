import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { LoggerService } from '../../frame/service/logger.service';
import { FormVerifiyService } from '../../frame/service/formVerifiy.service';
import { HttpService } from '../../frame/service/http.service';
import { DictConstant } from '../../sm/constant/dict.constant';
import { GoldbalConstant } from '../../sm/constant/global.constant';
import { Application } from '../../sm/constant/application.constant';
import { BaseComponent } from '../../frame/component/base.component';

@Component({
  selector: 'menu-edit',
  templateUrl: './menuEdit.component.html'
})
export class MenuEditComponent extends BaseComponent implements OnInit {

    constructor(
        // public activeModal: NgbActiveModal,
         private fb: FormBuilder
        , private logger: LoggerService
        ,private httpService: HttpService
        , formVerifiyService: FormVerifiyService) {
            super(formVerifiyService);
        }
  @Input() formControl: FormControl;
  typeList: Array<any> = DictConstant.createTypeList();
  data = {
      name: '',
      type: '0',
      remark: '',
      parent: '',
      link: ''
  };
  ngOnInit() {

    // 更新操作不查询
    this.ngbForm = this.fb.group({
      name: [this.data.name, Validators.required],
      type: [this.data.type, Validators.required],
      remark: [this.data.remark, Validators.required],
      parent: [this.data.parent, Validators.required],
      link: [this.data.link, Validators.required]
    });
    // this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }
  onSubmit() {
    //  this.activeModal.close(JSON.stringify(this.ngbForm.value));
  }
}
