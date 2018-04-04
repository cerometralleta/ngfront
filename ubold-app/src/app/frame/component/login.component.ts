import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../sm/constant/application.constant';
import { HttpService } from '../service/http.service';
import { LoggerService } from '../service/logger.service';
import { GoldbalConstant } from '../../sm/constant/global.constant';
import { ToastrService } from '../service/toastr.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';
import { LocalStorage } from '../storage/local.storage';
import { FrameConstants } from '../constants/FrameConstants';

@Component({
    selector: 'login-app',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    constructor(private logger: LoggerService,
        private httpService: HttpService,
        private router: Router,
        private fb: FormBuilder,
        private localStorage: LocalStorage,
        private toastr: ToastrService) { }
    ngbForm: FormGroup;
    creadencials = {username: '', password: ''};
    ngOnInit() {
        this.ngbForm = this.fb.group({
            username: [this.creadencials.username, Validators.required],
            password: [this.creadencials.password, Validators.required]
        });
    }

    onSubmit() {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const requestOptions = new RequestOptions({headers: headers});
        this.httpService.http.post(Application.login, this.ngbForm.value , requestOptions)
        .subscribe(result => {
            const resp = result.json();
            if (GoldbalConstant.STATUS_CODE.SUCCESS === resp.code) {
                this.localStorage.set(FrameConstants.Authorization, resp.result.tokenId);
                this.localStorage.set(FrameConstants.RESOURCES, JSON.stringify(resp.result.resources));
                this.localStorage.set(FrameConstants.AUTHORITY, JSON.stringify(resp.result.authority));
                this.router.navigate(['/home']);
            }else{
                this.toastr.error('登录失败');
            }
        });
    }
}
