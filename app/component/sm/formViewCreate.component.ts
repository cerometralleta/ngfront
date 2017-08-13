import { Component, OnInit } from '@angular/core';
import { DataViewModule } from "../../metadata/sm/dataViewModule.md";
import { NgbActiveModal } from "._@ng-bootstrap_ng-bootstrap@1.0.0-alpha.25@@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { LoggerService } from "../../service/basic/logger.service";
import { HttpService } from "../../service/basic/http.service";
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";
import { Mock } from "../../metadata/constant/mock.constant";

@Component({
    selector: 'sm-formViewCreate',
     templateUrl: './app/component/sm/formViewCreate.component.html'
})

// 表单创建
export class FormViewCreateComponent implements OnInit {
    constructor(
    // public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private logger: LoggerService,
    private httpService: HttpService) { }

    // 字段列表
    columns:Array<any>;

    // 数据结构

    ngOnInit() {

    }

    add(){

    }
}