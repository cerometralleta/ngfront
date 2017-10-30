import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseComponent } from '../../frame/component/base.component';
import { LoggerService } from '../../frame/service/logger.service';
import { FormVerifiyService } from '../../frame/service/formVerifiy.service';

@Component({
  selector: 'app-format-code',
  templateUrl: './formatCode.component.html',
})
export class FormatCodeComponent extends BaseComponent implements OnInit {
    constructor(public activeModal: NgbActiveModal
        , private fb: FormBuilder
        , private logger: LoggerService
        , formVerifiyService: FormVerifiyService) {
            super(formVerifiyService);
        }
  @Input() formControl: FormControl;
  ngOnInit() {
    let dateFormat = {prefix: ''};
    if (this.formControl && this.formControl.value) {
       dateFormat =  JSON.parse(this.formControl.value);
    }
    this.ngbForm = this.fb.group({
      prefix: [dateFormat.prefix, Validators.required]
    });
    this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onSubmit() {
     this.activeModal.close(JSON.stringify(this.ngbForm.value));
  }
}
