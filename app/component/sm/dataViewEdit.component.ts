import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { Application } from "../../metadata/constant/application.constant";
import { DataViewModule } from "../../metadata/sm/dataViewModule.md";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare var $: any;

@Component({
  selector: 'sm-dataViewEdit',
  templateUrl: './app/component/sm/dataViewEdit.component.html'
})
export class DataViewEditComponent implements OnInit,AfterViewInit {

  //form group
  ngbForm: FormGroup;
  formData: DataViewModule;
  formGroup: any;
  // error info
  formErrors: Array<string> = new Array<string>();

  constructor(private logger: LoggerService, private httpService: HttpService, private fb: FormBuilder) { }
  ngOnInit() {
    this.formData = new DataViewModule();
    this.buildForm();
  }

  //columnGrid
  columnGrid:any;
  @ViewChild("columnGrid") erf: ElementRef;
  ngAfterViewInit(): void {

        //jquery调用ng
        // let that = this;
        // that.alertValue('')

        this.columnGrid = $(this.erf.nativeElement);
        this.columnGrid.bootstrapTable(
          //  {onClickRow: function (row, $element, field) {
          //       that.alertValue(row.id);   
          //  }}
      );

      //箭头函数
      this.columnGrid.on('click-row.bs.table',($event, row, $element) => {
              this.alertValue(row.id);   
        });
  }

 alertValue(value:string){
    alert(value);
 }
  //创建form
  buildForm(): void {
    this.formGroup = {
      "dataViewCode": [this.formData.dataViewCode,
      [
        Validators.required,
        Validators.maxLength(5)
      ]
      ],
      "dataViewName": [this.formData.dataViewName,
      [
        Validators.required,
        Validators.maxLength(5)
      ]
      ],
      "sqlid": [this.formData.sqlid, [
        Validators.required,
        Validators.maxLength(50)
      ]],
      "remark": [this.formData.remark, Validators.maxLength(250)]
    };
    this.ngbForm = this.fb.group(this.formGroup);

    this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onSubmit() {
    this.formData = this.ngbForm.value;
    alert(this.formData.dataViewCode);
  }

  onValueChanged(data?: any) {
    if (!this.ngbForm) { return; }

    let messages = {
      'required': '为必填',
      'minlength': '长度不足',
      'maxlength': '长度超出范围'
    };

    //是否清空message ??
    this.formErrors = new Array<string>();
    //group data
    for (const field in this.formGroup) {

      //get control
      const control = this.ngbForm.get(field);
      if (control && control.dirty && !control.valid) {

        //control.errors required,minlength
        for (const key in control.errors) {

          //错误信息..
          this.formErrors.push( `${field}` + messages[key] );
           
        }
      }
    }
  }
}