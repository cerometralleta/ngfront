import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { DictConstant } from '../constant/dict.constant';
import { BaseComponent } from '../../frame/component/base.component';
import { LoggerService } from '../../frame/service/logger.service';
import { FormVerifiyService } from '../../frame/service/formVerifiy.service';
import { GoldbalConstant } from '../constant/global.constant';
import { Application } from '../constant/application.constant';
import { HttpService } from '../../frame/service/http.service';

@Component({
  selector: 'sqldefine-edit',
  templateUrl: './sqldefineEdit.component.html'
})
export class SqldefineEditComponent extends BaseComponent implements OnInit {

    constructor(
        // public activeModal: NgbActiveModal,
         private fb: FormBuilder
        , private logger: LoggerService
        ,private httpService: HttpService
        , formVerifiyService: FormVerifiyService) {
            super(formVerifiyService);
        }
  @Input() formControl: FormControl;
  codePrefix = '{"prefix":"SM"}';
  statusList: Array<any> = DictConstant.createStatusList();
  tableList: Array<any>;
  data = {
      sqlId: '',
      sqlName: '',
      status: 0,
      mastertable: '',
      mastertableid: '',
      selectsql: '',
      sqlexpand: '',
      table: '',
      sqldesc: ''
  };
  ngOnInit() {

    // 更新操作不查询

    this.ngbForm = this.fb.group({
      sqlId: [this.data.sqlId, Validators.required],
      sqlName: [this.data.sqlId, Validators.required],
      status: [this.data.status, Validators.required],
      mastertable: [this.data.mastertable, Validators.required],
      mastertableid: [this.data.mastertableid, Validators.required],
      selectsql: [this.data.selectsql, Validators.required],
      sqlexpand: [this.data.sqlexpand],
      table: [this.data.table],
      sqldesc: [this.data.sqldesc]
    });
    // this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  queryTable(){

     //  查询数据表
     this.httpService.doPost(Application.ubold_query_tables, {tableName: 'table_name'})
     .subscribe(resp => {
       if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
          this.tableList = resp.result;
        }
      });
  }

  querytableInfo(tableName){
    this.httpService.doPost(Application.ubold_query_querytableInfo, {tableName: 'table_name'})
    .subscribe(resp => {
      if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
         this.ngbForm.controls.mastertable.setValue(resp.result.masterTable);
         this.ngbForm.controls.mastertableid.setValue(resp.result.masterTableId);
         this.ngbForm.controls.selectsql.setValue(resp.result.selectSql);
       }
     });
  }

  onSubmit() {
    //  this.activeModal.close(JSON.stringify(this.ngbForm.value));
  }
}
