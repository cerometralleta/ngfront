import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
declare var $:any;

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IconpickerComponent),
  multi: true
};
@Component({
    selector: 'ng4b-iconpicker',
    providers: [INPUT_CONTROL_VALUE_ACCESSOR],
    template: `
          <input type="text" class="icon-picker"  #ngbIconpicker/>
              `
})
export class IconpickerComponent implements OnInit, ControlValueAccessor {
    writeValue(obj: any): void {
      
    }
    registerOnChange(fn: any): void {
      this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }
    ngOnInit(): void {
      $(this.erf.nativeElement).iconPicker();
    }
    @ViewChild("ngbIconpicker") erf: ElementRef;
    @Input() placeholder: string = null;
    @Input() minlength: number;
    @Input() maxlength: number;
    @Input() disabled: any;
    @Input() readonly: any = true;
    @Input() editable:boolean;
    private _onChange = (_: any) => { };
    private _onTouched = () => null;
    constructor(public activeModal: NgbActiveModal) {}
  }