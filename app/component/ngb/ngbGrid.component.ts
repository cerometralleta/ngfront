import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Options } from "../../metadata/ngb/ngbGrid/options.metadata";
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
        this.ngbGrid.bootstrapTable({
            columns: [{
                field: 'id',
                title: 'Item ID'
            }, {
                field: 'name',
                title: 'Item Name'
            }, {
                field: 'price',
                title: 'Item Price'
            }],
            data: [{
                id: 1,
                name: 'Item 1',
                price: '$1'
            }, {
                id: 2,
                name: 'Item 2',
                price: '$2'
            }]
        });
    }

    private ngbGrid: any;
    @ViewChild("ngbGrid") erf: ElementRef;
    @Input() options: Options;
    constructor() { }
}