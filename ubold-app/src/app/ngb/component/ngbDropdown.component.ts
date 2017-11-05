import { OnInit, Input, Component, forwardRef, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../frame/service/http.service';
import { GoldbalConstant } from '../../sm/constant/global.constant';
import { Application } from '../../sm/constant/application.constant';
import { ControlValueAccessor, FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgbDropdownComponent),
  multi: true
};

@Component({
    selector: 'ng4b-dropdown',
    template: ` <select class="form-control" #selectInput
                [ngModel]="_selectValue"
                [minlength]="minlength"
                [maxlength]="maxlength"
                [disabled]="disabled"
                (change)="selectValue($event)"
                >
                <option *ngFor="let data of datalist" [value]="data.code">{{data.text}}</option>
                </select>
              `,
    providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class NgbDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() dataFormat: string;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() disabled: boolean;
  @Input() readonly = true;
  datalist = [];
  private _selectValue: any = '';
  @ViewChild('selectInput') _elementRef: ElementRef;
  private propagateChange = (_: any) => { };
  private onTouched = () => null;
  constructor(public httpService: HttpService
    , private _renderer: Renderer2) {
  }
  ngOnInit(): void {
      if (this.dataFormat) {
        const df = JSON.parse( this.dataFormat );
        if ( df.code) {
          this.httpService.doPost(Application.ubold_sql_get_code +  df.code, {}).subscribe(resp => {
            if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                // this.formControlValue = resp.result;
                // this.writeValue(resp.result);
                // update the form
                // this.propagateChange(resp.result);
            }
          });
        }else if (df.data) {
          this.datalist = JSON.parse( df.data );
        }
      }
    }
    selectValue($event) {
       this.writeValue($event.target.value);
       this.propagateChange($event.target.value);
    }
    // From ControlValueAccessor interface
    writeValue(value: any) {
      this._selectValue = value;
    }
    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
      this.onTouched = fn;
    }
    registerOnChange(fn: any): void {
      this.propagateChange = fn;
    }
    setDisabledState(isDisabled: boolean) {
      this.disabled = isDisabled;
      this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
  }