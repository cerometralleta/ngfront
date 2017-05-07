import { NgModule } from '@angular/core';
import { HttpModule,JsonpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from "@angular/forms";
import { Routing, AppRoutingProviders } from "../app.routes";
import { LoggerService } from "../service/basic/logger.service";
import { NgbTreeComponent } from "../component/ngb/ngbTree.component";
import { HttpService } from "../service/basic/http.service";
import { NgbGridComponent } from "../component/ngb/ngbGrid.component";
import { RebirthNGModule } from 'rebirth-ng';
 
/**
 * 表单模块
 * ningzk
 */
@NgModule({
    imports: [BrowserModule,FormsModule,Routing,HttpModule,JsonpModule,RebirthNGModule,RebirthNGModule.forRoot(),],
    exports: [NgbTreeComponent,NgbGridComponent,RebirthNGModule],
    declarations: [
        NgbTreeComponent,NgbGridComponent
    ],
    providers: [LoggerService,AppRoutingProviders,HttpService]
})
export class Ngb2Module { }
