import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GoldbalConstant } from '../../sm/constant/global.constant';
declare var $: any;

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IconpickerComponent),
  multi: true
};
@Component({
    selector: 'ng4b-iconpicker',
    providers: [INPUT_CONTROL_VALUE_ACCESSOR],
    templateUrl: './Iconpicker.component.html'
})
export class IconpickerComponent implements OnInit, ControlValueAccessor {
    @Input() placeholder: string = null;
    @Input() minlength: number;
    @Input() maxlength: number;
    @Input() disabled: any;
    @Input() readonly: any = false;
    @Input() editable = true;

    formControlValue: string;
    modalRef: NgbModalRef;
    private _onChange = (_: any) => { };
    private _onTouched = () => null;
    writeValue(obj: any): void {
      if (obj) {
        this.formControlValue = obj;
      }
    }
    registerOnChange(fn: any): void {
      this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }
    ngOnInit(): void {
    }
    constructor(public modalService: NgbModal,
    ) {}
    ok($event){
      if ($event){
        const icon = $event.target.getAttribute('class');
        this.formControlValue = icon;
        this._onChange(icon);
        if (this.modalRef){
          this.modalRef.dismiss();
        }
      }
    }

    openIcon(content){
      this.modalRef = this.modalService.open(content, { size: GoldbalConstant.modal_size_lg });
      this.modalRef.result.then((result) => {}, (reason) => {});
    }

    _textChange($event){
      if ($event.target.value){
        this._onChange($event.target.value);
      }
    }
  }