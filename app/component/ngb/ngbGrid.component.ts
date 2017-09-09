import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Options, BootstrapTableDefaults } from "../../metadata/ngb/ngbGrid/options.md";
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";
import { Application } from "../../metadata/constant/application.constant";
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
        if(this.options.url.indexOf("http") < 0 && this.options.url.indexOf("https") < 0){
            this.options.url =  Application.ubold_sm_sql_bootstrap_dataList +  this.options.url
        }
        this.ngbootstrapTable = $(this.erf.nativeElement).bootstrapTable(this.options);
    }
    @Input() options: BootstrapTableDefaults;
    constructor() { }

    refresh(parameter){
        this.ngbootstrapTable.bootstrapTable("refresh", {query: parameter});
    }

    getSelections(){
        return this.ngbootstrapTable.bootstrapTable("getSelections");
    }

    getInstance(){
        return this.ngbootstrapTable;
    }
}