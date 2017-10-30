import { OnInit, Input, Component, forwardRef, Renderer2, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../frame/service/http.service';
import { GoldbalConstant } from '../../sm/constant/global.constant';
import { Application } from '../../sm/constant/application.constant';
import { ControlValueAccessor, FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgbDropdownComponent),
  multi: true
};

@Component({
    selector: 'ng4b-dropdown',
    template: ` <select class="form-control"
                [ngModel]="formControlValue"
                [minlength]="minlength"
                [maxlength]="maxlength"
                [disabled]="disabled"
                >
                <option *ngFor="let code of datalist" [value]="code">{{datalist[code]}}</option>
                </select>
              `
})
export class NgbDropdownComponent implements OnInit{
  @Input() dataFormat: string;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() disabled: boolean;
  @Input() readonly = true;
  datalist = {};
  formControlValue = [];
  private propagateChange = (_: any) => { };
  private onTouched = () => null;
  constructor(public httpService: HttpService) {
  }
  ngOnInit(): void {
      alert( 111 );
      // if (this.dataFormat) {
      //   const df = JSON.parse( this.dataFormat );
      //   if ( df.code) {
      //     this.httpService.doPost(Application.ubold_sql_get_code +  df.code, {}).subscribe(resp => {
      //       if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
      //           // this.formControlValue = resp.result;
      //           // this.writeValue(resp.result);
      //           // update the form
      //           // this.propagateChange(resp.result);
      //       }
      //     });
      //   }else if (df.data) {
      //     this.datalist = JSON.parse( df.data );
      //   }
      // }
    }

     // 该方法用于将模型中的新值写入视图或 DOM 属性中。
     writeValue(value: any) {
      this.formControlValue = value;
    }

    // 设置当控件接收到 change 事件后，调用的函数
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    //  设置当控件接收到 touched 事件后，调用的函数
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {}
  }