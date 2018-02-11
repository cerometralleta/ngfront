import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { DictConstant } from '../constant/dict.constant';
import { BaseComponent } from '../../frame/component/base.component';
import { LoggerService } from '../../frame/service/logger.service';
import { FormVerifiyService } from '../../frame/service/formVerifiy.service';

@Component({
  selector: 'sqldefine-edit',
  templateUrl: './sqldefineEdit.component.html'
})
export class SqldefineEditComponent extends BaseComponent implements OnInit {

    constructor(
        // public activeModal: NgbActiveModal,
         private fb: FormBuilder
        , private logger: LoggerService
        , formVerifiyService: FormVerifiyService) {
            super(formVerifiyService);
        }
  @Input() formControl: FormControl;
  codePrefix = '{"prefix":"SM"}';
  statusList: Array<any> = DictConstant.createStatusList();
  ngOnInit() {
    let data = {
        sqlId: '',
        sqlName: '',
        status: '',
        mastertable: '',
        mastertableid: '',
        selectsql: '',
        sqlexpand: '',
        table: '',
        sqldesc: ''
    };
    this.ngbForm = this.fb.group({
      sqlId: [data.sqlId, Validators.required],
      sqlName: [data.sqlId, Validators.required],
      status: [data.status, Validators.required],
      mastertable: [data.mastertable, Validators.required],
      mastertableid: [data.mastertableid, Validators.required],
      selectsql: [data.selectsql, Validators.required],
      sqlexpand: [data.sqlexpand],
      table: [data.table],
      sqldesc: [data.sqldesc]
    });
    // this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onSubmit() {
    //  this.activeModal.close(JSON.stringify(this.ngbForm.value));
  }
}
