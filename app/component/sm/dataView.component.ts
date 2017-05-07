import { Component, OnInit, Inject, Input } from '@angular/core';
import { URLSearchParams, Http, Jsonp } from "@angular/http";
import { HttpService } from "../../service/basic/http.service";
import { Application } from "../../metadata/constant/application.constant";
import { LoggerService } from "../../service/basic/logger.service";
import { ButtonType } from "../../metadata/constant/buttonType.constant";
import { GUID } from "../../utils/guid.util";
import { Response } from "../../metadata/response.md";
import { Options } from "../../metadata/ngb/ngbGrid/options.md";
import { Setting, DataModule } from "../../metadata/ngb/ngbTree/dataModule.md";
import { DataViewModule, Button } from "../../metadata/sm/dataViewModule.md";
import { ActivatedRoute, Params } from "../../../node_modules/._@angular_router@3.1.1@@angular/router";
import 'rxjs/add/operator/switchMap';

/**
 * 统一dataView
 */
@Component({
    selector: 'sm-dataview',
    templateUrl: './app/component/sm/dataView.component.html'
})
export class DataViewComponent implements OnInit {
    private dataModule: DataViewModule;
    //tree input
    // private treeModule: DataModule;
    @Input() sqlId: string;

    constructor(
        private logger: LoggerService
        , private httpService: HttpService
        , private route: ActivatedRoute
    ) {

    }

    ngOnInit() {

        
        //grid options
        let options: Options;
        //tree input
    let treeModule: DataModule;
        //buttons
        let buttons: Array<Button>
        this.route.params.switchMap((parmes: Params) =>
            
            this.httpService.doPost(Application.baseContext+"/" + parmes["sqlid"],"")
        ).subscribe(res => { // 传递过来的不是promise 所以要subscribe执行
            console.log(res);
            let resp = res.data() as Response<DataViewModule>;
            this.dataModule = resp.result;
            treeModule = this.dataModule.treeModule;
            options = this.dataModule.options;
            buttons = this.dataModule.buttons;

            //grid宽比例
            let gridRange = 12 - treeModule.range
        });


        // var params = new URLSearchParams();
        // params.set("id", "1");

        // // 传递过来的不是promise 所以要subscribe执行
        // this.httpService.doPost(Application.baseContext, params).subscribe(res => {
        //     console.log(res);
        //     let resp = res.data() as Response<DataViewModule>;
        //     this.dataModule = resp.result;
        //     treeModule = this.dataModule.treeModule;
        //     options = this.dataModule.options;
        //     buttons = this.dataModule.buttons;

        //     //grid宽比例
        //     let gridRange = 12 - treeModule.range

        //     //加载按钮需要的js文件
        //     buttons.forEach(element => {
        //     });

        // });
    }


}