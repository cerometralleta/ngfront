import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
declare var $:any;

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatetimepickerComponent),
    multi: true
};

@Component({
    selector: 'ng4b-datetimepicker',
    providers: [INPUT_CONTROL_VALUE_ACCESSOR],
    template: ` 
                <div class="input-group" >
                <input type="text" class="form-control" #ngbDatetimepicker  
                [placeholder]="placeholder"
                [ngModel]="formControlValue"
                [minlength]="minlength"
                [maxlength]="maxlength"
                [readonly]="readonly"
                [disabled]="disabled"
                >
                <span class="input-group-addon bg-custom b-0 text-white"><i class="icon-calender"></i></span>
                </div>
                `
})
export class DatetimepickerComponent implements OnInit, ControlValueAccessor {
    @Input() format: string;
    @Input() placeholder: string = null;
    @Input() disabled: any = false;
    @Input() readonly: any = false;
    @Input() minlength: number;
    @Input() maxlength: number;
    @Input() timepicker:boolean;

    @ViewChild("ngbDatetimepicker") erf: ElementRef;
    private _onChange = (_: any) => { };
    private _onTouched = () => null;
    constructor() {}
    
    $defaultformart:string = "Y-m-d H:i:s";
    writeValue(obj: any): void {
    }
    registerOnChange(fn: any): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }
    ngOnInit(): void {
        if(this.format){
            this.$defaultformart = this.format;
        }
        $.datetimepicker.setLocale('ch');//设置中文
        $(this.erf.nativeElement).datetimepicker({
            format: this.$defaultformart,
            timepicker:false,    //关闭时间选项
            yearStart:2000,     //设置最小年份
            yearEnd:2050,        //设置最大年份
            todayButton:false    //关闭选择今天按钮
        });
    }
  }