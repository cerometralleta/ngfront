import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { Application } from "../../metadata/constant/application.constant";

@Component({
    selector: 'sm-dataViewEdit',
    templateUrl: './app/component/sm/dataViewEdit.component.html'
})
export class DataViewEditComponent implements OnInit {
    constructor(private logger: LoggerService, private httpService: HttpService) { }
    ngOnInit() { 

    }
}