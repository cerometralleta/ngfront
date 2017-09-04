import { Observable } from "../../../node_modules/._rxjs@5.3.1@rxjs/Observable";
import { RouterStateSnapshot } from "../../../node_modules/._@angular_router@4.1.1@@angular/router/router";
import { ActivatedRouteSnapshot, Resolve } from "../../../node_modules/._@angular_router@4.1.1@@angular/router/src";
import { DataViewModule } from "../../metadata/sm/dataViewModule.md";
import { HttpService } from "../../service/basic/http.service";
import { Application } from "../../metadata/constant/application.constant";
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Injectable()
export class DataViewResolver implements Resolve<DataViewModule> {
    constructor(private httpService: HttpService,
     private activatedRoute: ActivatedRoute) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        
        //Resolve守卫（预先获取路由数据）。
        if(route.params.code != ""){
            return this.httpService.doPost(Application.ubold_sm_query + route.params.code, null);
        }
        return Promise.resolve();
    }
}