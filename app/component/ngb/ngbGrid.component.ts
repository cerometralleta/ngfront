import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Options, BootstrapTableDefaults } from "../../metadata/ngb/ngbGrid/options.md";
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";
import { Application } from "../../metadata/constant/application.constant";
import { GoldbalConstant } from '../../metadata/constant/global.constant';
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
    @Input() options: BootstrapTableDefaults;
    constructor() { }
    private ngbootstrapTable: any;
    @ViewChild("ngbootstrapTable") erf: ElementRef;
    ngOnInit() {
        // console.info(JSON.stringify(this.options));
        if (this.options.url.indexOf("http") < 0 && this.options.url.indexOf("https") < 0) {
            this.options.url = Application.ubold_sm_sql_bootstrap_dataList + this.options.url
        }

        //深度复制
        // let bootstrapOptions = JSON.parse(JSON.stringify(this.options));
        // bootstrapOptions.queryParams = this.options.queryParams;
        this.createStatefield(this.options);
        this.columnsformart(this.options.columns);
        this.ngbootstrapTable = $(this.erf.nativeElement).bootstrapTable(this.options);
    }
    ngAfterViewInit(): void { }
    createStatefield(bootstrapOptions: BootstrapTableDefaults) {
        if (bootstrapOptions.columns &&
            bootstrapOptions.columns.length > 0 &&
            bootstrapOptions.checkboxHeader) {
            let options = new ColumOptions();
            options.title = "_state";
            options.field = "_state";
            options.checkbox = true;
            options.isInsert = false;
            options.isView = false;
            options.updateType = GoldbalConstant.MODIFTY_TYPES.hide;
            bootstrapOptions.columns.splice(0, 0, options);
        }
    }

    columnsformart(columnOptions: Array<ColumOptions>) {
        if (columnOptions) {
            columnOptions.forEach(co => {
                 if(co.formatter instanceof Function){
                    return;
                 }
                 co.formatter =  null == co.formatter ? undefined : eval("("+co.formatter+")");
            })
        }
    }

    refresh(parameter?) {
        this.ngbootstrapTable.bootstrapTable("refresh", { query: parameter });
    }

    getSelections() {
        return this.ngbootstrapTable.bootstrapTable("getSelections");
    }

    getInstance() {
        return this.ngbootstrapTable;
    }
}