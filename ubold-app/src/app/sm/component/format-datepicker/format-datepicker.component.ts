import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoggerService } from '../../../frame/service/logger.service';
import { FormVerifiyService } from '../../../frame/service/formVerifiy.service';
import { BaseComponent } from '../../../frame/component/base.component';

@Component({
  selector: 'app-format-datepicker',
  templateUrl: './format-datepicker.component.html',
  styleUrls: ['./format-datepicker.component.css']
})
export class FormatDatepickerComponent extends BaseComponent implements OnInit {

    constructor(public activeModal: NgbActiveModal
        , private fb: FormBuilder
        , private logger: LoggerService
        , formVerifiyService: FormVerifiyService) {
            super(formVerifiyService);
        }
  @Input() formControl: FormControl;
  ngOnInit() {
    let dateFormat = {format: ''};
    if (this.formControl && this.formControl.value) {
       dateFormat =  JSON.parse(this.formControl.value);
    }
    this.ngbForm = this.fb.group({
      format: [dateFormat.format, Validators.required]
    });
  }

  onSubmit() {
     this.activeModal.close(JSON.stringify(this.ngbForm.value));
  }
}
