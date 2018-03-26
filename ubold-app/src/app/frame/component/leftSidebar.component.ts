import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../storage/local.storage';
import { FrameConstants } from '../constants/FrameConstants';
declare var $: any;
@Component({
    selector: 'home-leftSidebar',
    templateUrl: './leftSidebar.component.html'
})

export class LeftSidebarComponent implements OnInit {
    constructor(private localStorage: LocalStorage) { }
    resources: Array<any>;

    ngOnInit() {
         this.resources = JSON.parse(this.localStorage.get(FrameConstants.RESOURCES));
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
        $.App.init();
     }
}