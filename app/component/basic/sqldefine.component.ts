// import { Component, OnInit, Inject } from '@angular/core';
// import { URLSearchParams, Http, Jsonp } from "@angular/http";
// import { HttpService } from "../../service/basic/http.service";
// import { InputParam } from "../../metadata/ztree/InputParam.metadata";
// import { Setting } from "../../metadata/ztree/setting.metadata";
// import { Application } from "../../metadata/constant/application.constant";
// import { LoggerService } from "../../service/basic/logger.service";
// import { ButtonType } from "../../metadata/constant/buttonType.constant";
// import { GUID } from "../../utils/guid.util";
// import { SqlViewResult } from "../../metadata/basic/sqlViewResponse.metadata";
// import { BaseResponse } from "../../metadata/basic/response.metadata";
// @Component({
//     selector: 'sqldefine',
//     templateUrl: './app/component/basic/sqldefine.component.html'
// })

// export class SqldefineComponent implements OnInit {
//     private treeRange: number;
//     private gridRange: number;
//     private isShowTree: boolean;

//     //tree input
//     private treeInput: InputParam;

//     //Setting
//     private setting: Setting;
//     private nodes: any;
//     private buttonNavFlag:boolean;
//     private toolbarId:string;

//     constructor(private logger: LoggerService, private httpService: HttpService) {

//     }

//     ngOnInit() {
//         this.treeRange = 3;
//         this.gridRange = 7;
//         this.isShowTree = true;
//         this.toolbarId = GUID.createGUIDString();

//         //初始化数据
//         var params = new URLSearchParams();
//         params.set("id", "1");

//         // 传递过来的不是promise 所以要subscribe执行
//         this.httpService.doPost(Application.baseContext, params).subscribe(res => {
//             console.log(res);
//             BaseResponse<SqlViewResult>

//             //是否存在导航条按钮
//             this.buttonNavFlag = this.hasNavFuncButton();
            
//         });



//         //初始化树
//         this.treeInit();
//     }

//     treeInit() {
//         this.nodes = [
//             { id: 1, pId: 0, name: "父节点1" },
//             { id: 11, pId: 1, name: "子节点1" },
//             { id: 12, pId: 1, name: "子节点2" }
//         ];
//         this.treeInput = new InputParam(new Setting(), this.nodes);
//     }

//     //是否存在导航按钮
//     hasNavFuncButton(): boolean {
//         if (this.sqlView.buttonList) {
//             this.sqlView.buttonList.forEach(element => {
//                 if (element.type == ButtonType.NAV) {
//                     return true;
//                 }
//             });
//         }
//         return false;
//     }

//     //是否显示功能行
//     showSearchRow():boolean{
//         return this.sqlView.conditionList.length > 0 || this.hasNavFuncButton();
//     }

//     showToolbalCollapse():boolean{
//         return this.sqlView.conditionList.length > 0;
//     }

//     /**
//      * crud操作
//      */
//     crudOptions(){
      
//     }
// }