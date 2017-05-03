import { Component, OnInit, Inject } from '@angular/core';
import { URLSearchParams, Http, Jsonp } from "@angular/http";
import { HttpService } from "../../service/basic/http.service";
import { Setting } from "../../metadata/ngbtree/setting.metadata";
import { Application } from "../../metadata/constant/application.constant";
import { LoggerService } from "../../service/basic/logger.service";
import { ButtonType } from "../../metadata/constant/buttonType.constant";
import { GUID } from "../../utils/guid.util";
import { DataView } from "../../metadata/sm/dataView.metadata";
import { Response } from "../../metadata/response.metadata";

/**
 * 统一dataView
 */
@Component({
    selector: 'sm-dataview',
    templateUrl: './app/component/sm/dataView.component.html'
})
export class DataViewComponent implements OnInit {
        dataView: any;
    private treeRange: number;
    private gridRange: number;
    private isShowTree: boolean;

    //tree input
    private setting: Setting;

    private nodes: any;
    private buttonNavFlag:boolean;
    private toolbarId:string;

    constructor(private logger: LoggerService, private httpService: HttpService) {

    }

    ngOnInit() {
        this.treeRange = 3;
        this.gridRange = 7;
        this.isShowTree = true;
        this.toolbarId = GUID.createGUIDString();

           //初始化数据
        var params = new URLSearchParams();
        params.set("id", "1");

        // 传递过来的不是promise 所以要subscribe执行
        this.httpService.doPost(Application.baseContext, params).subscribe(res => {
            console.log(res);
           let resp = res.data() as Response<DataView>;
        });
    }

  
}