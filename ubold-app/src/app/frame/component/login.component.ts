import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../sm/constant/application.constant';
import { HttpService } from '../service/http.service';
import { LoggerService } from '../service/logger.service';
import { GoldbalConstant } from '../../sm/constant/global.constant';
import { ToastrService } from '../service/toastr.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'login-app',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    constructor(private logger: LoggerService,
        private httpService: HttpService,
        private router: Router,
        private fb: FormBuilder,
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
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        const requestOptions = new RequestOptions({headers: headers});
        this.httpService.http.post(Application.baseContext + '/rabc/auth/api/permit/login', this.ngbForm.value)
        .subscribe(result => {
            const resp = result.json();
            if (GoldbalConstant.STATUS_CODE.SUCCESS !== resp.code) {
                this.toastr.error('登录失败');
                return;
            }
            this.router.navigate(['/home']);
        });
    }
}
