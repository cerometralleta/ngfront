import { Component, OnInit } from '@angular/core';
import { Resolve,ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoggerService } from '../../frame/service/logger.service';
import { HttpService } from '../../frame/service/http.service';
import { FormViewResolver } from '../resolver/formViewResolver';
import { FormViewModel } from '../metadata/formViewModel.md';
import { GoldbalConstant } from '../constant/global.constant';
import { Columns } from '../../ngb/metadata/ngbGrid/columnOptions.md';
import { Application } from '../constant/application.constant';
/**
 * 自定义表单
 */
@Component({
    selector: 'sm-formView',
    templateUrl: './formView.component.html'
})
export class FormViewComponent implements OnInit {

    constructor(
        private logger: LoggerService,
        private httpService: HttpService,
        private fb: FormBuilder,
        private formViewResolver:FormViewResolver,
        private route: ActivatedRoute,
        private modalService: NgbModal) { }
        formViewModel: FormViewModel;
    ngbForm: FormGroup;

    // 表单数据
    formModel:any;

    ngOnInit() {
        this.formModel = {};
         // 监控路由守卫获取初始化数据
        this.route.data.subscribe(resp=>{
            if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.formViewResolver.code){
                this.formViewModel =  resp.formViewResolver.result;
            } else {
                this.formViewModel = new FormViewModel();
                this.formViewModel.columns = new Array<Columns>();
            }
        });
        this.ngbForm = new FormGroup(this.createFormGroup());
    }

    createFormGroup() {
         const fg = {};
        this.formViewModel.columns.forEach(element => {
            // fg[element.field] = new FormControl(this.viewModel[element.field], <any>Validators.required),
            fg[element.field] = new FormControl(this.formModel[element.field]);
        });
        return fg;
    }
    onSubmit(){
        this.logger.debug(JSON.stringify(this.ngbForm.value));
        let url = Application.baseContext + this.formViewModel.url;

        // 判断是否包含https://，http://
        if (this.formViewModel.url.indexOf('https://') >= 0 ||
            this.formViewModel.url.indexOf('http://') >= 0 ) {
                url = this.formViewModel.url;
        }
        this.httpService.doPost(url, this.ngbForm.value)
        .subscribe(res => {

            // 处理响应
            alert(JSON.stringify(res));
        });
    }
}