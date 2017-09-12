import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { DictConstant } from "../../metadata/constant/dict.constant";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from "../../metadata/sm/dataViewModule.md";
import { GUID } from "../../utils/guid.util";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GoldbalConstant } from "../../metadata/constant/global.constant";
@Component({
    selector: 'sm-buttonDialog',
    templateUrl: './app/component/sm/buttonDialog.component.html'
    // styleUrls: ['./name.component.css']
})
export class ButtonDialogComponent implements OnInit {
    ngbForm: FormGroup;
    buttons: Array<any> = DictConstant.createButtons();
    locations:Array<any> = DictConstant.createLocation();
   
    constructor(public activeModal: NgbActiveModal
    ,private fb: FormBuilder
    ,private logger: LoggerService,private httpService: HttpService) { }
    modalsizes: Array<any> = DictConstant.createModalsize();

    ngOnInit() { 
         let btn = new Button();
         btn.location = GoldbalConstant.LOCATION.nav;
         btn.option = GoldbalConstant.OPTIONS_BUTTON.service;
         btn.size = GoldbalConstant.modal_size_lg;
         btn.id = GUID.createGUIDString();
         this.ngbForm = this.fb.group({
            id:[btn.id,Validators.required],
            option:[btn.option,Validators.required],
            modal:[btn.modal],
            size:[btn.size],
            icon:[btn.icon],
            title:[btn.title,Validators.required],
            url:[btn.url],
            location:[btn.location,Validators.required],
            sort:[btn.sort]
         });
    }
   
    onSubmit(){
        //TODO  校验数据
        this.activeModal.close(this.ngbForm.value);
    }
}