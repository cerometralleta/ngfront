import { NgModule } from '@angular/core';
import { HttpModule,JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routing, AppRoutingProviders } from '../app.routes';
import { TopbarComponent } from './component/topbar.component';
import { LoginComponent } from './component/login.component';
import { LeftSidebarComponent } from './component/leftSidebar.component';
import { HomeComponent } from './component/home.componet';
import { RightSidebarComponent } from './component/rightSidebar.component';
import { MainComponent } from './component/main.component';
import { LoggerService } from './service/logger.service';
import { HttpService } from './service/http.service';


/**
 * 业务模块
 * ningzk
 */
@NgModule({
    imports: [BrowserModule, FormsModule, Routing, HttpModule, JsonpModule],
    exports: [],
    declarations: [
        TopbarComponent,
        LoginComponent,
        LeftSidebarComponent,
        HomeComponent,
        RightSidebarComponent,
        MainComponent
    ],
    providers: [LoggerService, AppRoutingProviders, HttpService]
})
export class FrameModule { }
