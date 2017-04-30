import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'login-app',
    templateUrl: './app/component/login.component.html'
})

export class LoginComponent implements OnInit {
    constructor(private router:Router) { }

    ngOnInit() { }

    login(username:string,pwd:string){
        let creadencials = {"email": username, "password": pwd};

        this.router.navigate(['/home']);
    }
}
