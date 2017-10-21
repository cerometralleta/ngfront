import { DataViewModule } from '../../metadata/sm/dataViewModule.md';
import { HttpService } from '../../service/basic/http.service';
import { Application } from '../../metadata/constant/application.constant';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { FormViewModel } from '../../metadata/sm/formViewModel.md';
import { Observable } from '../../../../node_modules/._rxjs@5.5.0@rxjs/Observable';

@Injectable()
export class FormViewResolver implements Resolve<FormViewModel> {
    constructor(private httpService: HttpService,
     private route: ActivatedRoute) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {

        // 获取参数
        // alert(this.route.params)
        // Resolve守卫（预先获取路由数据）。
        return this.httpService.doPost(Application.ubold_form_query + route.params.sqlid, this.route.params);
    }
}