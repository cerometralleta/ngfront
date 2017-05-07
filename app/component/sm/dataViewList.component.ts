import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { Application } from "../../metadata/constant/application.constant";
@Component({
    selector: 'sm-dataviewList',
    templateUrl: 'dataViewList.component.html'
})

export class SqlViewListComponent implements OnInit {
    constructor(private logger: LoggerService, private httpService: HttpService) { }
    private sqlId :string;
    ngOnInit() { 

        //初始化数据
        this.sqlId = "";
       
    }
}