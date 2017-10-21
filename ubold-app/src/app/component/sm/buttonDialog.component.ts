import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../service/basic/http.service';
import { LoggerService } from '../../service/basic/logger.service';
import { DictConstant } from '../../metadata/constant/dict.constant';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from '../../metadata/sm/dataViewModule.md';
import { GUID } from '../../utils/guid.util';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GoldbalConstant } from '../../metadata/constant/global.constant';
@Component({
    selector: 'sm-buttonDialog',
    templateUrl: './buttonDialog.component.html'
    // styleUrls: ['./name.component.css']
})
export class ButtonDialogComponent implements OnInit {
    ngbForm: FormGroup;
    buttons: Array<any> = DictConstant.createButtons();
    locations: Array<any> = DictConstant.createLocation();

    constructor(public activeModal: NgbActiveModal
        , private fb: FormBuilder
        , private logger: LoggerService, private httpService: HttpService) { }
    modalsizes: Array<any> = DictConstant.createModalsize();

    @Input() formGroup:FormGroup;
    ngOnInit() {
        let btn = new Button();
        btn.location = GoldbalConstant.LOCATION.nav;
        btn.option = GoldbalConstant.OPTIONS_BUTTON.service;
        btn.size = GoldbalConstant.modal_size_lg;
        btn.btnsize = '';
        btn.color = 'btn-default';
        btn.icon = '';
        btn.title = '按钮';
        btn.id = GUID.createGUIDString();

        if(this.formGroup){
            this.ngbForm = this.formGroup;
            return;
        }
        this.ngbForm = this.fb.group({
            id: [btn.id, Validators.required],
            option: [btn.option, Validators.required],
            modal: [btn.modal],
            size: [btn.size],
            icon: [btn.icon],
            title: [btn.title, Validators.required],
            url: [btn.url],
            location: [btn.location, Validators.required],
            sort: [btn.sort],
            btnsize: [btn.btnsize],
            color: [btn.color]
        });
    }

    onSubmit() {
        // TODO  校验数据
        this.activeModal.close(this.ngbForm.value);
    }

    // color
    _setColor(color) {
        const colorfc = <FormControl>this.ngbForm.controls.color;
        colorfc.setValue(color);
    }

    // button size
    _setButtonSize(btnsize) {
        const btnsizefc = <FormControl>this.ngbForm.controls.btnsize;
        btnsizefc.setValue(btnsize);
    }

    // icon
    _setIcon(icon) {
        const iconfc = <FormControl>this.ngbForm.controls.icon;
        iconfc.setValue(icon);
    }
}