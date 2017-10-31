import { OnInit, Input, Component, forwardRef, Renderer2, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../frame/service/http.service';
import { GoldbalConstant } from '../../sm/constant/global.constant';
import { Application } from '../../sm/constant/application.constant';
import { ControlValueAccessor, FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgbDropdownComponent),
  multi: true
};

@Component({
    selector: 'ng4b-dropdown',
    template: ` <select class="form-control"
                [ngModel]="_selectValue"
                [minlength]="minlength"
                [maxlength]="maxlength"
                [disabled]="disabled"
                >
                <option *ngFor="let code of datalist" [value]="code">{{datalist[code]}}</option>
                </select>
              `
})
export class NgbDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() dataFormat: string;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() disabled: boolean;
  @Input() readonly = true;
  datalist = {};
  private _selectValue: any = '';
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};
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
    get selectValue(): any {
      return this._selectValue;
    }
    set selectValue(value: any) {
      if (value !== this._selectValue) {
        // this._inputValue = value;
        this._onChangeCallback(value);
      }
      // this.hasValue = (value != null && value.length > 0)
       this._onTouchedCallback();
    }
    // From ControlValueAccessor interface
    writeValue(value: any) {
      this._selectValue = value;
    }
    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
      this._onChangeCallback = fn;
    }
    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
      this._onTouchedCallback = fn;
    }
  }