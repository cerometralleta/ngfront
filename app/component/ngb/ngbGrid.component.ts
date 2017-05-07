import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Options } from "../../metadata/ngb/ngbGrid/options.md";
declare var $: any;

/**
 * grid组件
 * ningzk
 */
@Component({
    selector: 'ngb-grid',
    templateUrl: './app/component/ngb/ngbGrid.component.html'
})

export class NgbGridComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        this.ngbGrid = $(this.erf.nativeElement);
        this.ngbGrid.bootstrapTable(this.options);
    }
    private ngbGrid: any;
    @ViewChild("ngbGrid") erf: ElementRef;
    @Input() options: Options;
    constructor() { }
}