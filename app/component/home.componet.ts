import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
    selector: 'home',
    templateUrl: './app/component/home.componet.html'
})

export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit() { 
         $.App.init();
    }
}