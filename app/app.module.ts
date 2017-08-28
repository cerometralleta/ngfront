import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule,JsonpModule } from "@angular/http";
 
import { AppComponent } from './app.component';
import { Routing, AppRoutingProviders } from "./app.routes";
import { LoggerService } from "./service/basic/logger.service";
import { HttpService } from "./service/basic/http.service";
import { FrameModule } from "./module/frame.module";
import { Ngb2Module } from "./module/ngb.module";
import { SmModule } from "./module/sm.module";
import { DataViewResolver } from "./resolver/sm/dataViewResolver";
import { FormViewResolver } from "./resolver/sm/formViewResolver";

@NgModule({
    imports: [FrameModule,Routing,Ngb2Module,SmModule],
    exports: [],
    declarations: [
        AppComponent
    ],
    providers: [AppRoutingProviders,DataViewResolver,FormViewResolver],
    bootstrap: [AppComponent] // 根组件
})
export class AppModule { }
