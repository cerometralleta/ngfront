// import { Component, OnInit,Inject } from '@angular/core';
// import { LoggerService } from "../service/logger.service";
// import { HttpService } from "../service/http.service";
// import { URLSearchParams,Http,Jsonp } from "@angular/http";
// import { Application } from "../metadata/constant/application.constant";
// import { Setting } from "../metadata/ngb/ngbTree/setting.metadata";
// @Component({
//     selector: 'sqldefine',
//     templateUrl: './src/app/component/sqldefine.component.html'
// })

// export class SqldefineComponent implements OnInit {
//     private treeRange: number;
//     private gridRange: number;
//     private isShowTree: boolean;


//     //Setting
//     private setting: Setting;
//     private nodes: any;

//     constructor(private logger: LoggerService, private httpService: HttpService) { 

//     }

//     ngOnInit() {
//         this.treeRange = 3;
//         this.gridRange = 7;
//         this.isShowTree = true;

//         //初始化数据
//         var params = new  ();
//         params.set("id", "1");
        
//         // 传递过来的不是promise 所以要subscribe执行
//         this.httpService.doGetResp(Application.baseContext, params).subscribe(res => {
//             console.log(res.text());
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
// }