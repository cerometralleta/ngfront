import { Component, OnInit,Inject } from '@angular/core';
import { URLSearchParams,Http,Jsonp } from "@angular/http";
import { HttpService } from "../../service/basic/http.service";
import { InputParam } from "../../metadata/ztree/InputParam.metadata";
import { Setting } from "../../metadata/ztree/setting.metadata";
import { Application } from "../../metadata/constant/application.constant";
import { LoggerService } from "../../service/basic/logger.service";
@Component({
    selector: 'sqldefine',
    templateUrl: './app/component/basic/sqldefine.component.html'
})

export class SqldefineComponent implements OnInit {
    private treeRange: number;
    private gridRange: number;
    private isShowTree: boolean;

    //tree input
    private treeInput: InputParam;

    //Setting
    private setting: Setting;
    private nodes: any;

    constructor(private logger: LoggerService, private httpService: HttpService) { 

    }

    ngOnInit() {
        this.treeRange = 3;
        this.gridRange = 7;
        this.isShowTree = true;

        //初始化数据
        var params = new URLSearchParams();
        params.set("id", "1");
        
        // 传递过来的不是promise 所以要subscribe执行
        this.httpService.doGetResp(Application.baseContext, params).subscribe(res => {
            console.log(res.text());
        });

        //初始化树
        this.treeInit();
    }

    treeInit() {
        this.nodes = [
            { id: 1, pId: 0, name: "父节点1" },
            { id: 11, pId: 1, name: "子节点1" },
            { id: 12, pId: 1, name: "子节点2" }
        ];
        this.treeInput = new InputParam(new Setting(), this.nodes);
    }
}