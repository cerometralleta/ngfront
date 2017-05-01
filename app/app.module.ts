import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule,JsonpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { LoggerService } from "./service/logger.service";
import { TopbarComponent } from "./component/topbar.component";
import { LoginComponent } from "./component/login.component";
import { LeftSidebarComponent } from "./component/leftSidebar.component";
import { RightSidebarComponent } from "./component/rightSidebar.component";
import { HomeComponent } from "./component/home.componet";
import { SqldefineComponent } from "./component/sqldefine.component";
import { MainComponent } from "./component/main.component";
import { UiTreeComponent } from "./component/uiTree.component";
import { Routing, AppRoutingProviders } from "./app.routes";
import { FormsModule } from "@angular/forms";
import { HttpService } from "./service/http.service";

@NgModule({
    imports: [BrowserModule,Routing,FormsModule,HttpModule,JsonpModule],
    exports: [],
    declarations: [
        AppComponent,
        TopbarComponent,
        LoginComponent,
        LeftSidebarComponent,
        HomeComponent,
        RightSidebarComponent,
        SqldefineComponent,
        MainComponent,
        UiTreeComponent
    ],
    providers: [LoggerService, AppRoutingProviders,HttpService],
    bootstrap: [AppComponent] // 根组件
})
export class AppModule { }
