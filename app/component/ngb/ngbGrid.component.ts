import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Options } from "../../metadata/ngb/ngbGrid/options.md";
declare var $: any;

/**
 * grid组件
 * ningzk
 */
@Component({
    selector: 'ng4b-grid',
    templateUrl: './app/component/ngb/ngbGrid.component.html'
})
export class NgbGridComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {

    }
    ngOnInit() {

    }
    @Input() options: Options;
    constructor() { }

    // doPage(){
    //     // int totalPageNum = (totalRecord  +  pageSize  - 1) / pageSize;  
    //      this.maxSize = (this.options.collectionSize + this.options.pageSize - 1 ) / this.options.pageSize;
    // }
}