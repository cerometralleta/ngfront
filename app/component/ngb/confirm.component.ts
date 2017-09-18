import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ng4b-confirm',
    template: `
                <div class="modal-header">
                    <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                    <button type="button" class="close" (click)="activeModal.dismiss('Cross click')" ></button>
                  </div>
                  <div class="modal-body">
                    <p>{{message || 'Are you sure?'}}</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn w-sm btn-default waves-effect waves-light" (click)="activeModal.close()">确定</button>
                    <button type="button" class="btn w-sm btn-white waves-effect" (click)="activeModal.dismiss()">取消</button>
                  </div>
              `
})
export class ConfirmComponent{
    @Input() title: string;
    @Input() message: string;
    constructor(public activeModal: NgbActiveModal) {}
  }