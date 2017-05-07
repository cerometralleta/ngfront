// import { Injectable } from '@angular/core';
// import { DataViewModule } from "../../metadata/sm/dataViewModule.md";
// import { Response } from "../../metadata/response.md";
// import { HttpService } from "../basic/http.service";
// import { Application } from "../../metadata/constant/application.constant";


// /**
//  * SQL MGR Service
//  * @ningzk
//  */
// @Injectable()
// export class SmService {
//     constructor(private httpService: HttpService) { }

//     getDataViewModule(sqlid: string) {
//         var params = new URLSearchParams();
//         params.set("sqlid", sqlid);
//         // 传递过来的不是promise 所以要subscribe执行
//        return this.httpService.doPost(Application.baseContext, params);
//     };
// }

    
// }