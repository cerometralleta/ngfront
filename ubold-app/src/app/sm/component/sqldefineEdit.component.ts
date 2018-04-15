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
import { ToastrService } from '../../frame/service/toastr.service';
import { DataViewEditParentComponent } from './DataViewEditParent.component';

@Component({
  selector: 'sqldefine-edit',
  templateUrl: './sqldefineEdit.component.html'
})
export class SqldefineEditComponent extends DataViewEditParentComponent implements OnInit {
    constructor(
        activeModal: NgbActiveModal,
        toastr: ToastrService,
        private fb: FormBuilder,
        logger: LoggerService,
        httpService: HttpService,
        formVerifiyService: FormVerifiyService) {
          super(activeModal, logger, httpService, toastr, formVerifiyService);
        }
  @Input() formControl: FormControl;
  codePrefix = '{"prefix":"SM"}';
  statusList: Array<any> = DictConstant.createStatusList();
  tableList: Array<any>;
  // data = {sqlId: '', status: 0, sqlName: '', mastertable: '',
  // mastertableid: '', selectsql: '', sqlexpand: '', table: '', sqldesc: ''};
  ngOnInit() {
    this.setInsertOptions();
    this.ngbForm = this.fb.group({
      id: [this.viewModel.id],
      version: [this.viewModel.version],
      sqlid: [{value: this.viewModel.sqlid, disabled: !this.insertOptions}, [Validators.required]],
      sqlname: [this.viewModel.sqlname, Validators.required],
      status: [this.viewModel.status, Validators.required],
      mastertable: [this.viewModel.mastertable, Validators.required],
      mastertableid: [this.viewModel.mastertableid, Validators.required],
      selectsql: [this.viewModel.selectsql, Validators.required],
      sqlexpand: [this.viewModel.sqlexpand],
      tablename: [this.viewModel.table],
      sqldesc: [this.viewModel.sqldesc]
    });
    this.ngbForm.valueChanges.subscribe(viewModel => this.onValueChanged(viewModel));
  }

  queryTableschemas() {
     this.httpService
     .doPost(Application.ubold_query_queryTableschemas,
      {tablename: this.ngbForm.controls.tablename.value, tableschema: 'ubold'})
     .subscribe(resp => {
       if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
          this.tableList = resp.result;
        }
      });
  }

  queryTableschemaInfo(tableName, tableComment) {
    this.httpService.doPost(Application.ubold_query_queryTableschemaInfo,
      {tablename: tableName, tableschema: 'ubold'})
    .subscribe(resp => {
      if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
         this.ngbForm.controls.mastertable.setValue(resp.result.masterTable);
         this.ngbForm.controls.mastertableid.setValue(resp.result.masterTableId);
         this.ngbForm.controls.selectsql.setValue(resp.result.selectSql);
         this.ngbForm.controls.sqlname.setValue(tableComment);
       }
     });
  }

  onSubmit() {
    this.httpService.doPost(this.getDefaultCrudUrl(), this.ngbForm.getRawValue())
      .subscribe(response => {
        if (GoldbalConstant.STATUS_CODE.SUCCESS === response.code) {
          this.activeModal.close(response.message);
        } else{
            this.toastr.error(response.message);
        }
      });
  }
}
