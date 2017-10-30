import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Application } from '../../sm/constant/application.constant';
import { GoldbalConstant } from '../../sm/constant/global.constant';
import { ToastrService } from '../../frame/service/toastr.service';
import { HttpService } from '../../frame/service/http.service';
import { LoggerService } from '../../frame/service/logger.service';

// 要实现双向数据绑定，这个不可少
export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbCodeComponent),
    multi: true
};

@Component({
    selector: 'ng4b-code',
    templateUrl: './ngbCode.component.html',
    providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})

/**
 * datetimepicker
 */
export class NgbCodeComponent implements OnInit, ControlValueAccessor {
    // @ViewChild("dateTimePicker") erf: ElementRef;
    @Input() dataFormat: string;
    // 外部传入属性
    // @Input() type: string = 'text';
    @Input() placeholder: string = null;
    @Input() minlength: number;
    @Input() maxlength: number;
    @Input() disabled: any;
    @Input() readonly: any = true;
    @Input() editable: boolean;
    formControlValue: string;

    // the method set in registerOnChange, it is just 
    // a placeholder for a method that takes one parameter, 
    // we use it to emit changes back to the form
    private propagateChange = (_: any) => { };
    private onTouched = () => null;
    constructor(private logger: LoggerService
        , public httpService: HttpService
        , public toastr: ToastrService
        , private changeDetectorRef: ChangeDetectorRef
    ) {}
    ngOnInit() {}
    getCode() {
        let prefixTemp = '';
        if (this.dataFormat) {
            prefixTemp =  JSON.parse( this.dataFormat ).prefix;
        }
        // 默认时间
        this.httpService.doPost(Application.ubold_sql_get_code + prefixTemp, {}).subscribe(resp => {
            if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                // this.formControlValue = resp.result;
                this.writeValue(resp.result);

                 // update the form
                this.propagateChange(resp.result);
            } else {
                this.toastr.error(resp.message);
            }
        });
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
}

