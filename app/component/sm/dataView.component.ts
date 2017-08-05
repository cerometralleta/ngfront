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
import { DataViewModule, TreeOptions, Button, DataFilter } from "../../metadata/sm/dataViewModule.md";
import { ActivatedRoute, Params } from "../../../node_modules/._@angular_router@4.1.1@@angular/router";
import 'rxjs/add/operator/switchMap';

/**
 * 统一dataView
 */
@Component({
    selector: 'sm-dataView',
    templateUrl: './app/component/sm/dataView.component.html'
})
export class DataViewComponent implements OnInit {

    //页面数据
    dataViewModule: DataViewModule;

    // 树操作
    treeOptions: TreeOptions;

    // 查询条件
    dataFilters: Array<DataFilter>;

    // 按钮
    buttons : Array<Button>;

    // 内容区域宽度
    colContentWidth : number;
    

    @Input() sqlId: string;
    constructor(
        private logger: LoggerService
        , private httpService: HttpService
        , private route: ActivatedRoute
    ) {

    }

    createMockData(){
        this.dataViewModule = new DataViewModule();
        this.treeOptions = new TreeOptions();
        this.treeOptions.isShow = true;
        this.treeOptions.width = 2;
    }

    ngOnInit() {
        
        this.createMockData();
        this.rightWidth();
        this.route.params.switchMap((parmes: Params) =>

            this.httpService.doPost(Application.baseContext + "/" + parmes["sqlid"], "")
        ).subscribe(res => { // 传递过来的不是promise 所以要subscribe执行
            console.log(res);
           
            // let resp = res.data() as Response<DataViewModule>;
            // this.dataViewModule = resp.result;
            // this.treeOptions = this.dataViewModule.treeOptions;
            // this.buttons = this.dataViewModule.buttons;
            // this.dataFilters = this.dataViewModule.dataFilters;
        });

      

        // var params = new URLSearchParams();
        // params.set("id", "1");

        // // 传递过来的不是promise 所以要subscribe执行
        // this.httpService.doPost(Application.baseContext, params).subscribe(res => {
        //     console.log(res);
        //     let resp = res.data() as Response<DataViewModule>;
        //     this.dataModule = resp.result;
        //     treeOptions = this.dataModule.treeOptions;
        //     options = this.dataModule.options;
        //     buttons = this.dataModule.buttons;

        //     //grid宽比例
        //     let gridRange = 12 - treeOptions.range

        //     //加载按钮需要的js文件
        //     buttons.forEach(element => {
        //     });

        // });
    }


   

    // 计算内容宽度
    rightWidth(){
      let maxWidth = 12;
      console.info(maxWidth);
      if(this.treeOptions.isShow){
            this.colContentWidth = maxWidth - this.treeOptions.width;
            return;
      }
       this.colContentWidth = maxWidth;
    }
}