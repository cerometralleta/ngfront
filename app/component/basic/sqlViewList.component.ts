import { Component, OnInit } from '@angular/core';
import { SqlViewResult } from "../../metadata/basic/sqlViewResponse.metadata";
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { Response } from "../../metadata/basic/response.metadata";
import { Application } from "../../metadata/constant/application.constant";
@Component({
    selector: 'sqlview-list',
    templateUrl: 'sqlViewList.component.html'
})

export class SqlViewListComponent implements OnInit {
    constructor(private logger: LoggerService, private httpService: HttpService) { }

    ngOnInit() { 

        //初始化数据
        var params = new URLSearchParams();
        params.set("id", "1");

        // 传递过来的不是promise 所以要subscribe执行
        this.httpService.doPost(Application.baseContext, params).subscribe(res => {
            console.log(res);
           let resp = res.data() as Response<SqlViewResult>;
        });
    }
}