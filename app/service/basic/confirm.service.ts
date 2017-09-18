import { Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmComponent } from '../../component/ngb/confirm.component';
import { GoldbalConstant } from '../../metadata/constant/global.constant';

@Injectable()
export class ConfirmService {

    constructor(private modalService: NgbModal) { }

    confirm(title?,message?){
        const modalRef = this.modalService.open(ConfirmComponent, { size: GoldbalConstant.modal_size_sm,windowClass:"confirm-dialog" });
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        return modalRef.result;
    }

}