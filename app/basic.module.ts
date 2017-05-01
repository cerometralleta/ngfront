import { NgModule } from '@angular/core';
import { HttpModule,JsonpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component';
import { LoggerService } from "./service/basic/logger.service";
import { TopbarComponent } from "./component/basic/topbar.component";
import { LoginComponent } from "./component/basic/login.component";
import { LeftSidebarComponent } from "./component/basic/leftSidebar.component";
import { RightSidebarComponent } from "./component/basic/rightSidebar.component";
import { HomeComponent } from "./component/basic/home.componet";
import { SqldefineComponent } from "./component/basic/sqldefine.component";
import { MainComponent } from "./component/basic/main.component";
import { UiTreeComponent } from "./component/basic/uiTree.component";
import { Routing, AppRoutingProviders } from "./app.routes";
import { FormsModule } from "@angular/forms";
import { HttpService } from "./service/basic/http.service";

@NgModule({
    imports: [BrowserModule,FormsModule,Routing,HttpModule,JsonpModule],
    exports: [],
    declarations: [
        TopbarComponent,
        LoginComponent,
        LeftSidebarComponent,
        HomeComponent,
        RightSidebarComponent,
        SqldefineComponent,
        MainComponent,
        UiTreeComponent
    ],
    providers: [LoggerService, AppRoutingProviders,HttpService]
})
export class BasicModule { }
