
import { Injectable } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot,Resolve  } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataViewModule } from '../metadata/dataViewModule.md';
import { HttpService } from '../../frame/service/http.service';
import { Application } from '../constant/application.constant';

@Injectable()
export class DataViewResolver implements Resolve<DataViewModule> {
    constructor(private httpService: HttpService,
     private activatedRoute: ActivatedRoute) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {

        // Resolve守卫（预先获取路由数据）。
        if ( route.params.code !== '') {
            return this.httpService.doPost(Application.ubold_sm_query + route.params.code, null);
        }
        // return Promise.resolve();
        return null;
    }
}