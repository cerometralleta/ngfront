import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Options, BootstrapTableDefaults } from "../../metadata/ngb/ngbGrid/options.md";
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";
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
    private ngbootstrapTable:any;
    @ViewChild("ngbootstrapTable") erf: ElementRef;
    ngOnInit() {
        // console.info(JSON.stringify(this.options));
        this.ngbootstrapTable = $(this.erf.nativeElement).bootstrapTable(this.options);
    }
    @Input() options: BootstrapTableDefaults;
    constructor() { }
}