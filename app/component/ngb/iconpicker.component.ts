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
              <div class="input-group" >
                  <input type="text" class="form-control" 
                  [placeholder]="placeholder"
                  [ngModel]="formControlValue"
                  [minlength]="minlength"
                  [maxlength]="maxlength"
                  [readonly]="readonly"
                  [disabled]="disabled"
                  >
                  <span class="input-group-btn">
                      <button class="btn btn-primary" role="iconpicker" data-icon="glyphicon-map-marker" #ngbIconpicker></button>
                  </span>
              </div>
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
      $(this.erf.nativeElement).iconpicker()
      .iconpicker('setAlign', 'center')
      .iconpicker('setArrowClass', 'btn-success')
      .iconpicker('setArrowPrevIconClass', 'glyphicon glyphicon-chevron-left')
      .iconpicker('setArrowNextIconClass', 'glyphicon glyphicon-chevron-right')
      .iconpicker('setCols', 9)
      .iconpicker('setFooter', true)
      .iconpicker('setHeader', true)
      .iconpicker('setIcon', 'glyphicon-pause')
      .iconpicker('setIconset', 'weathericon')
      .iconpicker('setLabelHeader', '{0} of {1} pages')
      .iconpicker('setLabelFooter', '{0} - {1} of {2} icons')
      .iconpicker('setPlacement', 'bottom')
      .iconpicker('setRows', 0)
      .iconpicker('setSearch', true)
      .iconpicker('setSearchText', 'Type text')
      .iconpicker('setSelectedClass', 'btn-danger')
      .iconpicker('setUnselectedClass', 'btn-primary');
      
      
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