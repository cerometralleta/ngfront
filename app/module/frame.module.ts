import { NgModule } from '@angular/core';
import { HttpModule,JsonpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from "@angular/forms";
import { Routing, AppRoutingProviders } from "../app.routes";
import { TopbarComponent } from "../component/frame/topbar.component";
import { LoginComponent } from "../component/frame/login.component";
import { LeftSidebarComponent } from "../component/frame/leftSidebar.component";
import { HomeComponent } from "../component/frame/home.componet";
import { RightSidebarComponent } from "../component/frame/rightSidebar.component";
import { DataViewComponent } from "../component/sm/dataView.component";
import { MainComponent } from "../component/frame/main.component";
import { LoggerService } from "../service/basic/logger.service";
import { HttpService } from "../service/basic/http.service";
 
/**
 * 业务模块
 * ningzk
 */
@NgModule({
    imports: [BrowserModule,FormsModule,Routing,HttpModule,JsonpModule],
    exports: [],
    declarations: [
        TopbarComponent,
        LoginComponent,
        LeftSidebarComponent,
        HomeComponent,
        RightSidebarComponent,
        MainComponent
    ],
    providers: [LoggerService, AppRoutingProviders,HttpService]
})
export class FrameModule { }
